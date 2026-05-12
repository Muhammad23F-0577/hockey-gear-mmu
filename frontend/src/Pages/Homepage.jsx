import { Link } from "react-router-dom";

const Homepage = () => {
  const stats = [
    { value: "10,000+", label: "Products" },
    { value: "500+", label: "Brands" },
    { value: "50,000+", label: "Happy Players" },
  ];

  const categories = [
    { title: "Sticks", to: "/bats", description: "Powerful hockey sticks", img: "/Images/bat.png" },
    { title: "Balls", to: "/balls", description: "High-speed match balls", img: "/Images/ball.png" },
    { title: "Kits", to: "/kits", description: "Complete hockey kits", img: "/Images/kits.png" },
  ];

  const brands = [
    "Grays",
    "OBO",
    "TK Hockey",
    "Gryphon",
    "Adidas Hockey",
    "Mazon",
    "Dita",
    "STX",
    "Ritual",
    "Osaka Hockey",
  ];

  const testimonials = [
    {
      name: "Muhammad",
      rating: "★★★★★",
      message: "Best hockey gear collection. Quality is top-tier and delivery is fast.",
    },
    {
      name: "Muhammad Mursaleen",
      rating: "★★★★★",
      message: "Helmet and sticks are premium. Perfect grip and balance.",
    },
    {
      name: "Muhammad Usman",
      rating: "★★★★★",
      message: "Great prices for hockey equipment. Very satisfied with service.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* HERO */}
      <section className="py-20 px-6 sm:px-10">
        <div className="mx-auto max-w-7xl flex flex-col gap-14 lg:flex-row lg:items-center lg:justify-between">

          <div className="max-w-2xl space-y-6">

            <p className="inline-flex rounded-full border border-green-400/30 bg-green-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-green-300">
              Premium Hockey Gear
            </p>

            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
              Play Like a Champion
            </h1>

            <p className="text-lg text-slate-300">
              Shop elite hockey sticks, balls, and kits with premium performance gear.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/bats" className="rounded-full bg-green-600 px-8 py-3 font-semibold shadow-lg shadow-green-500/30 hover:bg-green-500 transition">
                Shop Now
              </Link>

              <Link to="/kits" className="rounded-full border border-green-400/40 bg-white/5 px-8 py-3 font-semibold text-green-300 hover:bg-green-400/10 transition">
                Explore Kits
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {stats.map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
                  <p className="text-3xl font-bold text-green-300">{item.value}</p>
                  <p className="mt-2 text-sm uppercase tracking-wide text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT CARD */}
          <div className="max-w-xl rounded-3xl border border-white/10 bg-slate-900/80 p-8">

            <div className="rounded-3xl border border-white/5 bg-slate-950/90 p-8 text-center">
              <p className="text-sm uppercase tracking-wide text-green-300">Featured Collection</p>
              <h2 className="mt-4 text-3xl font-bold">Match-ready hockey kits</h2>
              <p className="mt-3 text-slate-300">
                Top-rated sticks, balls and protective gear.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="rounded-3xl border border-green-400/10 bg-green-500/10 p-4 text-center">
                <p className="font-semibold">Pro Sticks</p>
              </div>

              <div className="rounded-3xl border border-green-400/10 bg-green-400/10 p-4 text-center">
                <p className="font-semibold">Grip Tech</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10">

        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-wide text-green-300">
            Shop by category
          </p>
          <h2 className="mt-4 text-3xl font-semibold">
            Explore hockey categories
          </h2>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">

            {categories.map((item) => (
              <Link
                key={item.title}
                to={item.to}
                className="group rounded-3xl border border-white/10 bg-slate-900/80 overflow-hidden hover:-translate-y-1 hover:border-green-500/30 transition"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition"
                  />
                </div>

                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-slate-400">{item.description}</p>
                </div>
              </Link>
            ))}

          </div>
        </div>

      </section>

      {/* BRANDS SLIDER */}
      <section className="bg-slate-900/90 py-16">

        <div className="mx-auto max-w-7xl px-6 sm:px-10 text-center mb-10">
          <p className="text-sm uppercase tracking-wide text-green-300">
            Trusted brands
          </p>
          <h2 className="mt-4 text-3xl font-semibold">
            Hockey brands you trust
          </h2>
        </div>

        <div className="overflow-hidden border border-green-500/20 py-6 bg-slate-950/40">

          <div className="flex w-max gap-10 animate-scroll">

            {brands.concat(brands).map((brand, i) => (
              <div
                key={i}
                className="min-w-40 rounded-3xl border border-green-500/10 bg-green-500/10 px-6 py-4 text-center font-semibold text-green-200"
              >
                {brand}
              </div>
            ))}

          </div>

        </div>

        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .animate-scroll {
            animation: scroll 20s linear infinite;
          }
        `}</style>

      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10">

        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-wide text-green-300">
            What players say
          </p>
          <h2 className="mt-4 text-3xl font-semibold">
            Testimonials
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-3xl border border-white/10 bg-slate-950/80 p-8 text-center"
            >
              <p className="text-green-300 text-2xl">{item.rating}</p>
              <p className="mt-5 text-slate-300">“{item.message}”</p>

              <div className="mt-6 border-t border-white/10 pt-5 text-sm text-slate-400">
                <span className="text-white font-semibold">{item.name}</span>
              </div>
            </div>
          ))}

        </div>

      </section>

    </div>
  );
};

export default Homepage;