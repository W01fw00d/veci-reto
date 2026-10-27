function App() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-6 py-16 sm:px-10">
      <section className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold tracking-widest text-emerald-700 uppercase">
          Frontend challenge
        </span>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
          Reto VECI
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
          Scaffolding inicial de la implementación con React.
        </p>
        <div
          className="mt-8 h-1 w-16 rounded-full bg-emerald-500"
          aria-hidden="true"
        />
      </section>
    </main>
  );
}

export default App;
