import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiShoppingCart,
  FiSearch,
  FiMessageCircle,
  FiPlus,
  FiMinus,
  FiStar,
  FiShield,
  FiCpu,
  FiZap,
} from "react-icons/fi";

const initialProducts = [
  {
    id: 1,
    name: "Script Toko Premium",
    price: 150000,
    stock: 12,
    rating: 4.9,
    tag: "Best Seller",
    desc: "Script toko online modern, cepat, dan mudah di-custom.",
  },
  {
    id: 2,
    name: "Bot WhatsApp Pro",
    price: 200000,
    stock: 8,
    rating: 4.8,
    tag: "Hot",
    desc: "Bot WA auto respon, menu interaktif, dan order system.",
  },
  {
    id: 3,
    name: "Panel Admin Dark",
    price: 350000,
    stock: 5,
    rating: 5.0,
    tag: "Premium",
    desc: "Panel admin profesional dengan UI gelap futuristik.",
  },
  {
    id: 4,
    name: "Source Code Landing Page",
    price: 120000,
    stock: 20,
    rating: 4.7,
    tag: "New",
    desc: "Landing page elegan untuk jualan produk digital.",
  },
];

const formatIDR = (n) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(n);

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState(null);
  const [qtyById, setQtyById] = useState({});

  const filtered = useMemo(
    () =>
      products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      ),
    [products, search]
  );

  const cartCount = cart.reduce((a, b) => a + b.qty, 0);
  const cartTotal = cart.reduce((a, b) => a + b.qty * b.price, 0);

  const addToCart = (product) => {
    const qty = qtyById[product.id] || 1;
    if (product.stock <= 0) return;

    setCart((prev) => {
      const found = prev.find((x) => x.id === product.id);
      if (found) {
        return prev.map((x) =>
          x.id === product.id
            ? { ...x, qty: Math.min(x.qty + qty, product.stock) }
            : x
        );
      }
      return [...prev, { ...product, qty: Math.min(qty, product.stock) }];
    });
  };

  const updateCartQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) return item;
          return { ...item, qty: item.qty + delta };
        })
        .filter((item) => item.qty > 0)
    );
  };

  const changeStock = (id, delta) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p))
    );
  };

  const contactAdmin = () => {
    window.open("https://wa.me/6281234567890", "_blank", "noreferrer");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_25%)]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-400/40 bg-emerald-500/15 shadow-[0_0_25px_rgba(16,185,129,0.35)]">
              <span className="font-bold text-emerald-300">S</span>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wide">ScriptStore</h1>
              <p className="text-xs text-white/50">Dark Premium Marketplace</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <a href="#produk" className="transition hover:text-emerald-300">Produk</a>
            <a href="#stok" className="transition hover:text-emerald-300">Stok</a>
            <a href="#fitur" className="transition hover:text-emerald-300">Fitur</a>
            <a href="#kontak" className="transition hover:text-emerald-300">Kontak</a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 sm:flex">
              <FiSearch className="text-white/40" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-40 bg-transparent text-sm outline-none placeholder:text-white/30"
                placeholder="Cari script..."
              />
            </div>

            <button className="relative rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10">
              <FiShoppingCart />
              <span className="absolute -right-2 -top-2 rounded-full bg-emerald-400 px-2 py-0.5 text-[10px] font-bold text-black">
                {cartCount}
              </span>
            </button>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="rounded-2xl border border-white/10 bg-white/5 p-3 md:hidden"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-white/10 bg-black/95 md:hidden"
            >
              <div className="flex flex-col gap-3 px-4 py-4 text-white/75">
                <a href="#produk">Produk</a>
                <a href="#stok">Stok</a>
                <a href="#fitur">Fitur</a>
                <a href="#kontak">Kontak</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10">
        <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
              <FiShield /> Premium Digital Store
            </div>

            <h2 className="text-4xl font-black leading-tight md:text-6xl">
              Jual beli script dengan vibe{" "}
              <span className="text-emerald-300">dark hacker</span> yang keren.
            </h2>

            <p className="max-w-xl text-white/65">
              Marketplace ini dibuat untuk jual script, bot, source code, dan produk digital
              dengan desain premium, animasi halus, stok produk, dan keranjang belanja.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#produk"
                className="rounded-2xl bg-emerald-400 px-5 py-3 font-semibold text-black shadow-[0_0_20px_rgba(16,185,129,0.35)] transition hover:scale-[1.02]"
              >
                Lihat Produk
              </a>
              <button
                onClick={contactAdmin}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Hubungi Admin
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <FiCpu className="mb-3 text-emerald-300" />
                <div className="text-lg font-bold">Clean UI</div>
                <div className="text-sm text-white/50">Tampilan premium</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <FiZap className="mb-3 text-emerald-300" />
                <div className="text-lg font-bold">Fast</div>
                <div className="text-sm text-white/50">Responsive dan ringan</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <FiShield className="mb-3 text-emerald-300" />
                <div className="text-lg font-bold">Secure</div>
                <div className="text-sm text-white/50">Kesan profesional</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-emerald-500/10"
          >
            <div className="rounded-[1.5rem] border border-emerald-400/20 bg-black/60 p-5">
              <p className="text-sm text-emerald-300">System Status</p>
              <h3 className="mt-2 text-2xl font-bold">Marketplace Online</h3>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="rounded-2xl bg-white/5 p-4 text-center">
                  <div className="text-xl font-bold text-emerald-300">24/7</div>
                  <div className="text-xs text-white/50">Support</div>
                </div>
                <div className="rounded-2xl bg-white/5 p-4 text-center">
                  <div className="text-xl font-bold text-emerald-300">100+</div>
                  <div className="text-xs text-white/50">Script</div>
                </div>
                <div className="rounded-2xl bg-white/5 p-4 text-center">
                  <div className="text-xl font-bold text-emerald-300">Fast</div>
                  <div className="text-xs text-white/50">Checkout</div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="produk" className="mt-16">
          <div className="mb-6">
            <h3 className="text-3xl font-bold">Produk Unggulan</h3>
            <p className="text-white/55">Pilih script yang kamu butuhkan.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ y: -6 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                    {p.tag}
                  </span>
                  <span className="text-xs text-white/45">Stok: {p.stock}</span>
                </div>

                <h4 className="text-xl font-bold">{p.name}</h4>
                <p className="mt-2 text-sm text-white/60">{p.desc}</p>

                <div className="mt-4 flex items-center gap-2 text-emerald-300">
                  <FiStar />
                  <span className="text-sm">{p.rating}</span>
                </div>

                <div className="mt-4 text-2xl font-black text-white">
                  {formatIDR(p.price)}
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => changeStock(p.id, -1)}
                    className="rounded-xl border border-white/10 bg-white/5 p-2"
                    aria-label="Kurangi stok"
                  >
                    <FiMinus />
                  </button>
                  <button
                    onClick={() => changeStock(p.id, 1)}
                    className="rounded-xl border border-white/10 bg-white/5 p-2"
                    aria-label="Tambah stok"
                  >
                    <FiPlus />
                  </button>
                  <button
                    onClick={() => {
                      setSelected(p);
                      addToCart(p);
                    }}
                    className="ml-auto rounded-xl bg-emerald-400 px-4 py-2 font-semibold text-black transition hover:scale-[1.02]"
                  >
                    Tambah ke Keranjang
                  </button>
                </div>

                <button
                  onClick={() => setSelected(p)}
                  className="mt-3 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white/80"
                >
                  Lihat Detail
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="stok" className="mt-16 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-2xl font-bold">Tambah Stok</h3>
            <p className="mt-2 text-white/60">
              Admin bisa menambah dan mengurangi stok langsung dari tombol pada card produk.
            </p>
            <div className="mt-4 space-y-3 text-sm text-white/70">
              <p>• Tombol + untuk tambah stok.</p>
              <p>• Tombol - untuk kurangi stok.</p>
              <p>• Cocok untuk katalog digital yang sering update.</p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-2xl font-bold">Checkout & Admin</h3>
            <p className="mt-2 text-white/60">
              Pembeli bisa lanjut checkout lewat admin via WhatsApp.
            </p>
            <button
              onClick={contactAdmin}
              className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-green-500 px-5 py-3 font-semibold text-black"
            >
              <FiMessageCircle /> Chat Admin
            </button>
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-2xl font-bold">Keranjang Belanja</h3>
          {cart.length === 0 ? (
            <p className="mt-3 text-white/55">Keranjang masih kosong.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/40 p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-white/50">
                      {formatIDR(item.price)} / item
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateCartQty(item.id, -1)}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() => updateCartQty(item.id, 1)}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                    >
                      +
                    </button>
                  </div>
                  <div className="font-bold text-emerald-300">
                    {formatIDR(item.qty * item.price)}
                  </div>
                </div>
              ))}

              <div className="flex flex-col gap-3 border-t border-white/10 pt-4 md:flex-row md:items-center md:justify-between">
                <div className="text-white/70">
                  Total:{" "}
                  <span className="font-bold text-white">
                    {formatIDR(cartTotal)}
                  </span>
                </div>
                <button
                  onClick={contactAdmin}
                  className="rounded-2xl bg-emerald-400 px-5 py-3 font-semibold text-black"
                >
                  Checkout via Admin
                </button>
              </div>
            </div>
          )}
        </section>

        <section id="fitur" className="mt-16">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-500/10 to-fuchsia-500/10 p-8">
            <h3 className="text-3xl font-bold">Fitur Pelengkap</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-3 text-white/70">
              <div>• Search produk.</div>
              <div>• Navbar animasi responsif.</div>
              <div>• Dark hacker neon style.</div>
              <div>• Keranjang belanja interaktif.</div>
              <div>• Modal detail produk.</div>
              <div>• Kontak admin cepat.</div>
            </div>
          </div>
        </section>

        {selected && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 px-4">
            <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#0b0b0b] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold">{selected.name}</h3>
                  <p className="mt-2 text-white/60">{selected.desc}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="rounded-xl border border-white/10 bg-white/5 p-2"
                >
                  <FiX />
                </button>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-white/5 p-3">
                  <div className="text-emerald-300 font-bold">{selected.stock}</div>
                  <div className="text-xs text-white/45">Stok</div>
                </div>
                <div className="rounded-2xl bg-white/5 p-3">
                  <div className="text-emerald-300 font-bold">{selected.rating}</div>
                  <div className="text-xs text-white/45">Rating</div>
                </div>
                <div className="rounded-2xl bg-white/5 p-3">
                  <div className="text-emerald-300 font-bold">{selected.tag}</div>
                  <div className="text-xs text-white/45">Kategori</div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    addToCart(selected);
                    setSelected(null);
                  }}
                  className="flex-1 rounded-2xl bg-emerald-400 px-5 py-3 font-semibold text-black"
                >
                  Tambah ke Keranjang
                </button>
                <button
                  onClick={contactAdmin}
                  className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white"
                >
                  Hubungi Admin
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}