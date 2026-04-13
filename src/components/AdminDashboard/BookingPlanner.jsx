import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Timeline from "react-calendar-timeline";
import moment from "moment";
import { ChevronLeft, ChevronRight, Filter, Loader2 } from "lucide-react";
import PageHeader from "./PageHeader";
import { cn } from "../../lib/utils";
import "./TimelineBase.css";
import { fetchAllBookings } from "../../store/Booking/bookingSlice";
import { fetchAllProducts } from "../../store/Product/productSlice";

// ─── SAISON STATIQUE ──────────────────────────────────────────────────────────
const SEASON_START = moment("2026-04-01");
const SEASON_END   = moment("2026-11-30");

// ─── CONFIG CATÉGORIES ─────────────────────────────────────────────────────────
const TYPE_CONFIG = {
  "MH Propriétaire": { label: "MH Propriétaire", color: "#6b21a8" },
  "MH Locatif":      { label: "MH Locatif",       color: "#7e22ce" },
  "Emplacement":     { label: "Emplacement",       color: "#9333ea" },
  "Caravane":        { label: "Caravane",          color: "#a855f7" },
};

const ALL_TYPES = Object.keys(TYPE_CONFIG);

// ─── STYLES CSS INJECTÉS ──────────────────────────────────────────────────────
const TIMELINE_CSS = `
  .rct-header-root { background: #fdfafb !important; border-bottom: 1px solid #e9d5f0 !important; }
  .rct-calendar-header { border-color: #e9d5f0 !important; }
  .rct-label-group { background: #fdfafb !important; color: #581c87 !important; font-size: 12px !important; font-weight: 600 !important; text-transform: capitalize !important; border-color: #e9d5f0 !important; }
  .rct-label { background: #fdfafb !important; color: #7e22ce !important; font-size: 11px !important; font-weight: 600 !important; border-color: #e9d5f0 !important; }
  .rct-dateHeader { background: #fdfafb !important; border-left-color: #e9d5f0 !important; color: #7e22ce !important; font-size: 11px !important; font-weight: 500 !important; }
  .rct-dateHeader-primary { background: #fdfafb !important; color: #581c87 !important; font-size: 12px !important; font-weight: 600 !important; text-transform: capitalize !important; }
  .rct-sidebar { border-right: 1px solid #e9d5f0 !important; background: #ffffff !important; }
  .rct-sidebar-row { border-bottom: 1px solid #f4e8f9 !important; background: transparent !important; padding: 0 !important; }
  .rct-sidebar-row:hover { background: #fdfafb !important; }
  .rct-horizontal-lines .rct-hl-even, .rct-horizontal-lines .rct-hl-odd { border-bottom: 1px solid #f4e8f9 !important; background: transparent !important; }
  .rct-vertical-lines .rct-vl { border-left: 1px solid #f4e8f9 !important; }
  .rct-vertical-lines .rct-vl.rct-day-6, .rct-vertical-lines .rct-vl.rct-day-0 { background: rgba(126, 34, 206, 0.04) !important; }
  .rct-cursor-line { border-left: 2px solid #7e22ce !important; opacity: 0.6; }
  .rct-item { line-height: 28px !important; border-radius: 4px !important; border: none !important; }
  .rct-item .rct-item-content { padding: 0 8px !important; font-size: 10px !important; font-weight: 600 !important; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .rct-item:hover { filter: brightness(1.1); cursor: pointer; }
`;

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const getProductId = (product) => {
  if (!product) return null;
  if (typeof product === "object") {
    if (product["@id"]) {
      const match = String(product["@id"]).match(/\/(\d+)$/);
      return match ? parseInt(match[1], 10) : null;
    }
    return product.id;
  }
  const match = String(product).match(/\/(\d+)$/);
  return match ? parseInt(match[1], 10) : null;
};

const getCategory = (product) => {
  const title = product.title?.toLowerCase() ?? "";
  const hasOwner = product.user?.some((u) => u.isOwner === true);
  if (title.includes("m-h") && hasOwner) return "MH Propriétaire";
  if (title.includes("m-h")) return "MH Locatif";
  if (title.includes("caravane")) return "Caravane";
  if (title.includes("emplacement")) return "Emplacement";
  return "MH Locatif";
};

const getGuestLabel = (booking) => booking.user?.name ?? `#${booking.id}`;

// ─── COMPOSANT PRINCIPAL ──────────────────────────────────────────────────────
export default function BookingPlanner() {
  const dispatch = useDispatch();

  const allBookings = useSelector((state) => state.bookings?.allBookings ?? []);
  const allProducts = useSelector((state) => state.products?.allProducts ?? []);
  const loading     = useSelector((state) => state.bookings?.loading || state.products?.loading);
  const error       = useSelector((state) => state.bookings?.error ?? null);

  const [activeFilters, setActiveFilters] = useState([...ALL_TYPES]);
  const [currentMonth, setCurrentMonth]   = useState(SEASON_START.clone().startOf("month"));

  useEffect(() => {
    dispatch(fetchAllBookings());
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const visibleStart = currentMonth.clone().startOf("month").valueOf();
  const visibleEnd   = currentMonth.clone().endOf("month").valueOf();

  const toggleFilter = (type) =>
    setActiveFilters((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );

  const goMonth = (dir) => {
    const next = currentMonth.clone().add(dir, "month");
    if (next.isBefore(SEASON_START.clone().startOf("month"))) return;
    if (next.isAfter(SEASON_END.clone().startOf("month"))) return;
    setCurrentMonth(next);
  };

  const canPrev = currentMonth.isAfter(SEASON_START.clone().startOf("month"));
  const canNext = currentMonth.isBefore(SEASON_END.clone().startOf("month"));

  const productsMap = React.useMemo(() => {
    const map = new Map();
    allProducts?.forEach((p) => {
      map.set(p.id, { ...p, category: getCategory(p) });
    });
    return map;
  }, [allProducts]);

  const groups = React.useMemo(() => {
    const result = [];
    ALL_TYPES.forEach((category) => {
      if (!activeFilters.includes(category)) return;
      const productsOfCategory = allProducts.filter((p) => getCategory(p) === category);
      if (productsOfCategory.length === 0) return;
      result.push({ id: `header-${category}`, title: TYPE_CONFIG[category].label, isHeader: true, category });
      productsOfCategory.forEach((p) =>
        result.push({ id: p.id, title: p.title ?? `Produit #${p.id}`, category, isHeader: false })
      );
    });
    return result;
  }, [allProducts, activeFilters]);

  const items = React.useMemo(() => {
    return allBookings
      .map((b) => {
        let productId = null;
        if (Array.isArray(b.products) && b.products.length > 0) {
          productId = getProductId(b.products[0]);
        } else if (b.product) {
          productId = getProductId(b.product);
        } else if (b.productId) {
          productId = b.productId;
        }

        const product = productsMap.get(productId);
        if (!product) return null;

        const { category } = product;
        if (!activeFilters.includes(category)) return null;

        const cfg = TYPE_CONFIG[category];
        if (!cfg || !b.startAt || !b.endAt) return null;

        return {
          id:         b.id,
          group:      productId,
          title:      getGuestLabel(b),
          start_time: moment(b.startAt),
          end_time:   moment(b.endAt),
          itemProps: {
            style: { background: cfg.color, border: "none", borderRadius: "4px", color: "#fff" },
          },
        };
      })
      .filter(Boolean);
  }, [allBookings, productsMap, activeFilters]);

  const groupRenderer = ({ group }) => {
    if (group.isHeader) {
      return (
        <div className="h-full flex items-center px-3 bg-plum-50 border-t border-plum-200">
          <span className="text-[10px] font-bold text-plum-600 uppercase tracking-wider">
            {group.title}
          </span>
        </div>
      );
    }
    return (
      <div className="h-full flex items-center px-4 bg-white border-b border-plum-50">
        <span className="text-xs font-medium text-plum-900 truncate">{group.title}</span>
      </div>
    );
  };

  if (loading && allBookings.length === 0 && allProducts.length === 0) {
    return (
      <div className="animate-slideup2 min-h-screen">
        <PageHeader title="Planning des réservations" subtitle="Vue globale par mois" />
        <div className="flex items-center justify-center h-64 text-plum-600 gap-3">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm font-medium">Chargement du planning…</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
        <div className="flex items-center justify-center h-64 text-red-500 gap-2">
          <span className="text-sm font-medium">Erreur : {error}</span>
        </div>
    );
  }

  return (
    <div className="animate-slideup2 min-h-screen">
      <style>{TIMELINE_CSS}</style>

      {/* ── NAVIGATION ET FILTRES ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">

        <div className="flex items-center gap-2">
          <button
            onClick={() => goMonth(-1)}
            disabled={!canPrev}
            className="p-2 rounded-lg hover:bg-plum-100 text-plum-700 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-sm font-semibold text-plum-900 min-w-[150px] text-center capitalize">
            {currentMonth.format("MMMM YYYY")}
          </span>

          <button
            onClick={() => goMonth(1)}
            disabled={!canNext}
            className="p-2 rounded-lg hover:bg-plum-100 text-plum-700 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-1 bg-white rounded-lg border border-plum-200 p-1">
          <Filter className="w-4 h-4 text-plum-400 ml-2" />
          {ALL_TYPES.map((category) => {
            const cfg    = TYPE_CONFIG[category];
            const active = activeFilters.includes(category);
            return (
              <button
                key={category}
                onClick={() => toggleFilter(category)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5",
                  active ? "bg-plum-700 text-white shadow-sm" : "text-plum-600 hover:bg-plum-50"
                )}
              >
                {active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                {cfg.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── TIMELINE ── */}
      <div className="carte p-0 overflow-hidden">
        {groups.length > 0 ? (
          <Timeline
            groups={groups}
            items={items}
            visibleTimeStart={visibleStart}
            visibleTimeEnd={visibleEnd}
            onTimeChange={() => {}}
            lineHeight={40}
            itemHeightRatio={0.7}
            sidebarWidth={160}
            canMove={false}
            canResize={false}
            stackItems
            groupRenderer={groupRenderer}
            timeSteps={{ second: 0, minute: 0, hour: 0, day: 1, month: 1, year: 1 }}
          />
        ) : (
          <div className="flex items-center justify-center h-40 text-plum-400 text-sm">
            Aucun produit à afficher pour les filtres sélectionnés.
          </div>
        )}
      </div>

      {/* ── LÉGENDE ── */}
      <div className="flex items-center gap-4 mt-4 text-xs text-plum-600">
        {ALL_TYPES.map((type) => {
          const cfg = TYPE_CONFIG[type];
          return (
            <div key={type} className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded" style={{ background: cfg.color }} />
              <span>{cfg.label}</span>
            </div>
          );
        })}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-[rgba(126,34,206,0.04)] border border-plum-100" />
          <span>Week-end</span>
        </div>
      </div>
    </div>
  );
}
