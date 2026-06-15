"use client";

import { useEffect, useMemo, useState } from "react";
import { WEEK, DAY_NAMES, type WeekSettings } from "@/app/data/week";
import {
  catDot,
  dateKey,
  dayDate,
  getChips,
  todayIdx,
  weekLabel,
} from "@/app/lib/schedule";
import {
  loadDone,
  loadSettings,
  saveDone,
  saveSettings,
} from "@/app/lib/storage";

export default function Planner() {
  // Évite le mismatch d'hydratation : on ne calcule la date/les données
  // côté client qu'après le montage.
  const [mounted, setMounted] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [cfg, setCfg] = useState<WeekSettings>(() => loadSettings());
  const [done, setDone] = useState<Set<string>>(new Set());
  const [settingsOpen, setSettingsOpen] = useState(false);

  const today = mounted ? todayIdx() : -1;

  // Init au montage
  useEffect(() => {
    setMounted(true);
    setCfg(loadSettings());
    setActiveIdx(todayIdx());
  }, []);

  // Recharge les cases cochées quand on change de jour
  useEffect(() => {
    if (!mounted) return;
    setDone(loadDone(dateKey(dayDate(activeIdx))));
  }, [activeIdx, mounted]);

  function toggle(id: string) {
    setDone((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      saveDone(dateKey(dayDate(activeIdx)), next);
      return next;
    });
  }

  function handleSaveSettings(draft: WeekSettings) {
    setCfg(draft);
    saveSettings(draft);
    setSettingsOpen(false);
  }

  const day = WEEK[activeIdx];
  const isTT = !day.weekend && cfg.tt[activeIdx];
  const isLB = !day.weekend && cfg.lb[activeIdx];
  const chips = useMemo(() => getChips(activeIdx, cfg), [activeIdx, cfg]);

  return (
    <>
      <div className="header">
        <div className="header-top">
          <div>
            <p className="title">Mon Planning</p>
            <p className="week-label">{mounted ? weekLabel() : ""}</p>
          </div>
          <button
            className="settings-btn"
            onClick={() => setSettingsOpen(true)}
            title="Configurer la semaine"
            aria-label="Configurer la semaine"
          >
            ⚙
          </button>
        </div>

        <div className="day-tabs">
          {WEEK.map((d, i) => {
            const date = dayDate(i);
            const tabTT = !d.weekend && cfg.tt[i];
            const tabLB = !d.weekend && cfg.lb[i];
            const cls = [
              "day-tab",
              i === activeIdx ? "active" : "",
              i === today ? "today" : "",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <button key={d.name} className={cls} onClick={() => setActiveIdx(i)}>
                <span className="dn">{d.name}</span>
                <span className="dd">{mounted ? date.getDate() : ""}</span>
                {tabTT && <span className="badge badge-tl">TL</span>}
                {tabLB && <span className="badge badge-lb">LB</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="day-chips">
        {chips.map((c) => (
          <span key={c} className="chip">
            {c}
          </span>
        ))}
      </div>

      <div className="content">
        {day.sections.map((sec) => {
          const visible = sec.events.filter((ev) => {
            if (ev.vis === "bureau" && isTT) return false;
            if (ev.vis === "tt" && !isTT) return false;
            if (ev.vis === "lb" && !isLB) return false;
            return true;
          });
          if (!visible.length) return null;
          return (
            <div key={sec.name} className="section">
              <div className="section-name">{sec.name}</div>
              <div className="events-card">
                {visible.map((ev) => {
                  const isDone = done.has(ev.id);
                  return (
                    <div
                      key={ev.id}
                      className={`ev-row${isDone ? " done" : ""}`}
                      onClick={() => toggle(ev.id)}
                    >
                      <span className="ev-time">{ev.time}</span>
                      <div className={`ev-dot dot-${catDot(ev.title, ev.sub)}`} />
                      <div className="ev-body">
                        <div className="ev-title">{ev.title}</div>
                        <div className="ev-sub">{ev.sub}</div>
                      </div>
                      <div className="ev-check">{isDone ? "✓" : ""}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {settingsOpen && (
        <SettingsModal
          cfg={cfg}
          onClose={() => setSettingsOpen(false)}
          onSave={handleSaveSettings}
        />
      )}
    </>
  );
}

function SettingsModal({
  cfg,
  onClose,
  onSave,
}: {
  cfg: WeekSettings;
  onClose: () => void;
  onSave: (draft: WeekSettings) => void;
}) {
  const [draft, setDraft] = useState<WeekSettings>(() => structuredClone(cfg));
  const [open, setOpen] = useState(false);

  // Déclenche l'animation d'ouverture après le montage
  useEffect(() => {
    const t = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(t);
  }, []);

  function toggleDraft(type: "tt" | "lb", i: number) {
    setDraft((prev) => {
      const next = structuredClone(prev);
      next[type][i] = !next[type][i];
      return next;
    });
  }

  return (
    <div
      className={`modal-overlay${open ? " open" : ""}`}
      onClick={onClose}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Ma semaine type</span>
          <button className="modal-close" onClick={onClose} aria-label="Fermer">
            ✕
          </button>
        </div>

        <div>
          {DAY_NAMES.map((name, i) => (
            <div key={name} className="modal-day-row">
              <span className="modal-day-name">{name}</span>
              <div className="modal-toggles">
                <button
                  className={`toggle-pill${draft.tt[i] ? " on-tt" : ""}`}
                  onClick={() => toggleDraft("tt", i)}
                >
                  TT
                </button>
                <button
                  className={`toggle-pill${draft.lb[i] ? " on-lb" : ""}`}
                  onClick={() => toggleDraft("lb", i)}
                >
                  LB
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="modal-save" onClick={() => onSave(draft)}>
          Enregistrer
        </button>
      </div>
    </div>
  );
}
