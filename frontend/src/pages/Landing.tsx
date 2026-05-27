import { Link } from 'react-router-dom';

// Indieast Coffee menu items from the reference photo
const INDIEAST_MENU = [
  { name: 'BLACK COLD BREW', desc: 'Kopi yang sudah kami siapkan dengan kesehatan untukmu.', price: '13K' },
  { name: 'INDIEAST WHITE', desc: 'Kopi susu indieast punya.', price: '14K' },
  { name: 'WESTEN PANDAN', desc: 'Anggap saja ini kopen berwujud minuman.', price: '15K' },
  { name: 'NOORDER KIWI', desc: 'Perpaduan pola manis dan teh bersatu dengan asam kiwi.', price: '15K' },
  { name: 'MATCHA', desc: 'Ga perlu ke Jepang untuk ngerasain matcha yang enak.', price: '16K' },
  { name: 'MANUAL BREW', desc: '*Tanya barista untuk ketersediaan beans.', price: '*ASK' },
];

const Landing = () => {
  return (
    <div className="flex flex-col">

      {/* ── HERO ── */}
      <section 
        className="relative bg-blue-electric overflow-hidden min-h-[90vh] flex flex-col justify-end"
        style={{ backgroundImage: "url('/background.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-ink/70"></div>
        {/* Big background text */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
        >
          <span className="text-[22vw] font-black uppercase leading-none text-white/5 whitespace-nowrap tracking-tighter">
            KOFFEE
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 pb-20 pt-32">
          <div className="max-w-4xl">
            <p className="text-white/70 text-xs font-bold uppercase tracking-[0.3em] mb-6">
              Est. 2024 · Specialty Coffee
            </p>
            <h1 className="text-[14vw] md:text-[10vw] lg:text-[9vw] font-black uppercase leading-[0.85] tracking-tighter text-white mb-10 animate-fadeInUp">
              JOMORO<br />KOFFEE
            </h1>
            <div className="flex flex-wrap gap-4 animate-fadeInUp" style={{ animationDelay: '0.15s' }}>
              <Link to="/menu" className="btn-outline-white">
                View Menu
              </Link>
              <Link to="/register" className="bg-white text-blue-electric font-bold py-3 px-8 uppercase tracking-widest text-sm transition hover:bg-chalk-off active:scale-95">
                Order Now
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom ticker bar */}
        <div className="bg-ink py-3 overflow-hidden">
          <div className="marquee-track">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="text-white text-xs font-bold uppercase tracking-widest whitespace-nowrap px-8">
                Specialty Coffee&nbsp; · &nbsp;Cold Brew&nbsp; · &nbsp;Manual Brew&nbsp; · &nbsp;Open Every Day&nbsp; · &nbsp;17.00–23.00&nbsp; · &nbsp;
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED MENU (Indieast Coffee Style) ── */}
      <section className="bg-white py-24 px-6">
        <div className="container mx-auto max-w-5xl">

          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-ink-muted mb-3">Our Signature</p>
              <h2 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter text-ink">
                MENU
              </h2>
            </div>
            <div className="md:text-right">
              <p className="text-4xl md:text-6xl font-black uppercase leading-none tracking-tighter text-blue-electric">
                FUEL<br />YOU<br />BETTER
              </p>
            </div>
          </div>

          {/* Menu list — Indieast style bold list */}
          <div className="border-t-2 border-ink">
            {INDIEAST_MENU.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between py-6 border-b border-chalk-muted group hover:bg-blue-electric/5 transition-colors duration-200 px-2 -mx-2"
              >
                <div className="flex-1 pr-6">
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-ink group-hover:text-blue-electric transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-ink-muted text-sm mt-1 font-medium">{item.desc}</p>
                </div>
                <div className="text-2xl md:text-3xl font-black text-ink group-hover:text-blue-electric transition-colors shrink-0">
                  {item.price}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-start">
            <Link to="/menu" className="btn-primary">
              Browse Full Menu →
            </Link>
          </div>
        </div>
      </section>

      {/* ── OPENING HOURS STRIP ── */}
      <section className="bg-blue-electric py-16 px-6">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-white/70 text-xs font-bold uppercase tracking-[0.3em] mb-2">We Are Open</p>
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter text-white">
              EVERYDAY
            </h2>
          </div>
          <div className="flex gap-12 md:gap-20 text-center">
            <div>
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Opens</p>
              <p className="text-4xl md:text-5xl font-black text-white">17.00</p>
            </div>
            <div className="w-px bg-white/20" />
            <div>
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Closes</p>
              <p className="text-4xl md:text-5xl font-black text-white">23.00</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES GRID ── */}
      <section className="bg-chalk-off py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-ink-muted mb-4">What We Serve</p>
          <h2 className="section-heading text-ink mb-16">Our<br />Categories</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Cold Brew', icon: '🧊', tag: 'Best Seller' },
              { name: 'Espresso', icon: '☕', tag: 'Classic' },
              { name: 'Manual Brew', icon: '☁️', tag: 'Signature' },
              { name: 'Non-Coffee', icon: '🍵', tag: 'For Everyone' },
            ].map((cat) => (
              <Link
                to="/menu"
                key={cat.name}
                className="group bg-white border border-chalk-muted p-6 flex flex-col gap-4 hover:bg-blue-electric hover:border-blue-electric transition-all duration-300"
              >
                <span className="text-4xl">{cat.icon}</span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-ink-muted group-hover:text-white/70 transition-colors mb-1">
                    {cat.tag}
                  </p>
                  <h3 className="text-lg font-black uppercase tracking-tight text-ink group-hover:text-white transition-colors">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT STRIP ── */}
      <section className="bg-ink py-24 px-6">
        <div className="container mx-auto max-w-5xl grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-blue-electric text-xs font-bold uppercase tracking-[0.3em] mb-4">About Us</p>
            <h2 className="text-5xl font-black uppercase leading-none tracking-tighter text-white mb-6">
              COLD BREW<br />INDIEAST<br />COFFEE 2.0
            </h2>
            <Link to="/menu" className="btn-outline-white inline-block">
              Order Online
            </Link>
          </div>
          <div>
            <p className="text-white/60 text-lg font-medium leading-relaxed">
              Founded with a passion for exceptional coffee, Jomoro Koffee is your local destination for premium brews and a warm atmosphere. Whether you need an evening boost or a relaxing night out, our doors are open to serve you the best — every single day.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-white border-t border-chalk-muted py-10 px-6">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-blue-electric flex items-center justify-center">
              <span className="text-white font-black text-[9px]">JK</span>
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-ink">Jomoro Koffee</span>
          </div>
          <p className="text-xs text-ink-muted font-medium">© 2024 Jomoro Koffee. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/menu" className="text-xs font-bold uppercase tracking-widest text-ink-muted hover:text-blue-electric transition-colors">Menu</Link>
            <Link to="/login" className="text-xs font-bold uppercase tracking-widest text-ink-muted hover:text-blue-electric transition-colors">Login</Link>
            <Link to="/register" className="text-xs font-bold uppercase tracking-widest text-ink-muted hover:text-blue-electric transition-colors">Register</Link>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Landing;
