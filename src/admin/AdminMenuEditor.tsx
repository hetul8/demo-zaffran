import { useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Check } from "lucide-react";
import type { MenuItem, Tag } from "../types";

const A = { brown: "#2C1810", mid: "#5C3D2E", muted: "#9C7D6A", terra: "#C4552A", border: "rgba(44,24,16,0.1)", card: "#FFFFFF", input: "#EDE6DC", bg: "#F5F0E8" };

const ALL_TAGS: Tag[] = ["veg", "nonveg", "vegan", "gf", "chefs"];
const TAG_LABELS: Record<Tag, string> = { veg: "Veg", nonveg: "Non-Veg", vegan: "Vegan", gf: "Gluten-Free", chefs: "Chef's Special" };
const TAG_COLORS: Record<Tag, string> = { veg: "#16a34a", nonveg: "#b91c1c", vegan: "#15803d", gf: "#8B6914", chefs: "#C4552A" };
const CATEGORIES = ["Starters", "Mains", "Desserts", "Drinks"];

const inputStyle = { background: A.input, border: `1px solid ${A.border}`, borderRadius: "4px", color: A.brown, width: "100%", padding: "10px 12px", fontSize: "0.875rem", outline: "none" };

const EMPTY_ITEM: Omit<MenuItem, "id"> = { name: "", description: "", price: 0, tags: [], category: "Starters", spice: 0, hidden: false };

function ItemForm({ item, onSave, onCancel }: {
  item: Partial<MenuItem>;
  onSave: (item: Omit<MenuItem, "id">) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Omit<MenuItem, "id">>({
    name: item.name ?? "",
    description: item.description ?? "",
    price: item.price ?? 0,
    tags: item.tags ?? [],
    category: item.category ?? "Starters",
    spice: item.spice ?? 0,
    hidden: item.hidden ?? false,
  });

  const toggleTag = (tag: Tag) => {
    setForm((f) => ({ ...f, tags: f.tags.includes(tag) ? f.tags.filter((t) => t !== tag) : [...f.tags, tag] }));
  };

  const valid = form.name.trim() && form.price > 0;

  return (
    <div className="p-6" style={{ background: A.card, borderRadius: "6px", border: `1px solid ${A.border}` }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="sm:col-span-2">
          <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: A.muted, letterSpacing: "0.1em" }}>Name *</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} placeholder="Dish name" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: A.muted, letterSpacing: "0.1em" }}>Description *</label>
          <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} style={{ ...inputStyle, resize: "none" }} placeholder="Short description of the dish" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: A.muted, letterSpacing: "0.1em" }}>Price (₹) *</label>
          <input type="number" min={0} value={form.price || ""} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} style={inputStyle} placeholder="0" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: A.muted, letterSpacing: "0.1em" }}>Category</label>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={{ ...inputStyle, appearance: "none" }}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: A.muted, letterSpacing: "0.1em" }}>Spice Level (0–3)</label>
          <div className="flex gap-2">
            {[0, 1, 2, 3].map((n) => (
              <button key={n} type="button" onClick={() => setForm({ ...form, spice: n })}
                className="w-10 h-10 text-sm transition-all duration-200"
                style={{ background: form.spice === n ? A.terra : A.input, border: `1px solid ${form.spice === n ? A.terra : A.border}`, color: form.spice === n ? "#FAF7F2" : A.muted, borderRadius: "4px" }}>
                {n}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: A.muted, letterSpacing: "0.1em" }}>Visibility</label>
          <button type="button" onClick={() => setForm({ ...form, hidden: !form.hidden })}
            className="flex items-center gap-2 px-4 py-2.5 text-xs transition-all duration-200"
            style={{ background: form.hidden ? "rgba(185,28,28,0.1)" : "rgba(22,163,74,0.1)", border: `1px solid ${form.hidden ? "#b91c1c" : "#16a34a"}`, color: form.hidden ? "#b91c1c" : "#16a34a", borderRadius: "4px" }}>
            {form.hidden ? <><EyeOff size={13} /> Hidden</> : <><Eye size={13} /> Visible</>}
          </button>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: A.muted, letterSpacing: "0.1em" }}>Dietary Tags</label>
          <div className="flex flex-wrap gap-2">
            {ALL_TAGS.map((tag) => {
              const active = form.tags.includes(tag);
              return (
                <button key={tag} type="button" onClick={() => toggleTag(tag)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs transition-all duration-200"
                  style={{ background: active ? `${TAG_COLORS[tag]}15` : "transparent", border: `1.5px solid ${active ? TAG_COLORS[tag] : A.border}`, color: active ? TAG_COLORS[tag] : A.muted, borderRadius: "4px" }}>
                  {active && <Check size={10} />}
                  {TAG_LABELS[tag]}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex gap-3 pt-4" style={{ borderTop: `1px solid ${A.border}` }}>
        <button onClick={onCancel} className="px-5 py-2.5 text-xs uppercase tracking-widest"
          style={{ border: `1px solid ${A.border}`, color: A.muted, borderRadius: "4px", letterSpacing: "0.1em" }}>
          Cancel
        </button>
        <button disabled={!valid} onClick={() => onSave(form)}
          className="px-6 py-2.5 text-xs uppercase tracking-widest transition-all duration-200"
          style={{ background: valid ? A.terra : A.input, color: valid ? "#FAF7F2" : A.muted, borderRadius: "4px", letterSpacing: "0.1em" }}>
          Save Item
        </button>
      </div>
    </div>
  );
}

export function AdminMenuEditor({ menuItems, onUpdate }: { menuItems: MenuItem[]; onUpdate: (m: MenuItem[]) => void }) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [filterCat, setFilterCat] = useState<string>("All");
  const [search, setSearch] = useState("");

  const filtered = menuItems.filter((m) =>
    (filterCat === "All" || m.category === filterCat) &&
    (!search || m.name.toLowerCase().includes(search.toLowerCase()))
  );

  const saveItem = (id: number, data: Omit<MenuItem, "id">) => {
    onUpdate(menuItems.map((m) => m.id === id ? { ...m, ...data } : m));
    setEditingId(null);
  };

  const addItem = (data: Omit<MenuItem, "id">) => {
    const maxId = Math.max(...menuItems.map((m) => m.id), 0);
    onUpdate([...menuItems, { ...data, id: maxId + 1 }]);
    setAdding(false);
  };

  const deleteItem = (id: number) => {
    if (!window.confirm("Delete this item from the menu?")) return;
    onUpdate(menuItems.filter((m) => m.id !== id));
  };

  const toggleVisibility = (id: number) => {
    onUpdate(menuItems.map((m) => m.id === id ? { ...m, hidden: !m.hidden } : m));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <input placeholder="Search items…" value={search} onChange={(e) => setSearch(e.target.value)}
            className="text-sm outline-none px-3 py-2"
            style={{ background: A.card, border: `1px solid ${A.border}`, borderRadius: "4px", color: A.brown, minWidth: "180px" }} />
          {["All", ...CATEGORIES].map((cat) => (
            <button key={cat} onClick={() => setFilterCat(cat)} className="px-3 py-1.5 text-xs transition-all duration-200"
              style={{ background: filterCat === cat ? A.terra : A.card, border: `1px solid ${filterCat === cat ? A.terra : A.border}`, color: filterCat === cat ? "#FAF7F2" : A.muted, borderRadius: "4px" }}>
              {cat}
            </button>
          ))}
        </div>
        <button onClick={() => { setAdding(true); setEditingId(null); }}
          className="flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-widest transition-all duration-200"
          style={{ background: A.terra, color: "#FAF7F2", borderRadius: "4px", letterSpacing: "0.1em" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#D4754A")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = A.terra)}>
          <Plus size={14} /> Add Item
        </button>
      </div>

      {/* Add Form */}
      {adding && (
        <ItemForm item={EMPTY_ITEM} onSave={addItem} onCancel={() => setAdding(false)} />
      )}

      {/* Items by category */}
      {(filterCat === "All" ? CATEGORIES : [filterCat]).map((cat) => {
        const catItems = filtered.filter((m) => m.category === cat);
        if (catItems.length === 0) return null;
        return (
          <div key={cat}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs uppercase tracking-widest font-medium" style={{ color: A.terra, letterSpacing: "0.12em" }}>{cat}</span>
              <div className="h-px flex-1" style={{ background: A.border }} />
              <span className="text-xs" style={{ color: A.muted }}>{catItems.length} items</span>
            </div>
            <div className="flex flex-col gap-2">
              {catItems.map((item) => (
                <div key={item.id}>
                  {editingId === item.id ? (
                    <ItemForm item={item} onSave={(d) => saveItem(item.id, d)} onCancel={() => setEditingId(null)} />
                  ) : (
                    <div className="flex items-center justify-between p-4 transition-all duration-200"
                      style={{ background: item.hidden ? "#F9F5F2" : A.card, border: `1px solid ${A.border}`, borderRadius: "6px", opacity: item.hidden ? 0.6 : 1 }}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-sm font-medium" style={{ color: A.brown }}>{item.name}</span>
                          {item.hidden && <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "rgba(185,28,28,0.1)", color: "#b91c1c" }}>Hidden</span>}
                          <div className="flex gap-1">
                            {item.tags.map((tag) => (
                              <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded"
                                style={{ background: `${TAG_COLORS[tag]}15`, color: TAG_COLORS[tag] }}>
                                {TAG_LABELS[tag]}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-xs truncate" style={{ color: A.muted }}>{item.description}</p>
                      </div>
                      <div className="flex items-center gap-4 ml-4 shrink-0">
                        <span className="text-sm font-semibold" style={{ color: A.terra }}>₹{item.price}</span>
                        <div className="flex gap-1">
                          <button onClick={() => toggleVisibility(item.id)} title={item.hidden ? "Show" : "Hide"}
                            className="w-8 h-8 flex items-center justify-center rounded transition-colors"
                            style={{ color: A.muted }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#8B6914")}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = A.muted)}>
                            {item.hidden ? <Eye size={15} /> : <EyeOff size={15} />}
                          </button>
                          <button onClick={() => { setEditingId(item.id); setAdding(false); }} title="Edit"
                            className="w-8 h-8 flex items-center justify-center rounded transition-colors"
                            style={{ color: A.muted }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = A.terra)}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = A.muted)}>
                            <Pencil size={15} />
                          </button>
                          <button onClick={() => deleteItem(item.id)} title="Delete"
                            className="w-8 h-8 flex items-center justify-center rounded transition-colors"
                            style={{ color: A.muted }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#b91c1c")}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = A.muted)}>
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
      {filtered.length === 0 && !adding && (
        <div className="py-16 text-center text-sm" style={{ color: A.muted }}>No items found. <button onClick={() => setAdding(true)} style={{ color: A.terra }}>Add one?</button></div>
      )}
    </div>
  );
}
