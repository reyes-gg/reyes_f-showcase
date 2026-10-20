function Navbar({ view, onChangeView }) {
  function tabClass(name) {
    const base =
      "relative py-1 text-sm font-medium transition after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-accent after:transition-all ";
    return (
      base +
      (view === name
        ? "text-ink after:w-full"
        : "text-muted hover:text-ink after:w-0 hover:after:w-full")
    );
  }

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <button
          onClick={() => onChangeView("gallery")}
          className="flex items-baseline gap-1 font-serif text-2xl font-medium tracking-tight"
        >
          Showcase
          <span className="text-accent">.</span>
        </button>

        <nav className="flex items-center gap-8">
          <button className={tabClass("gallery")} onClick={() => onChangeView("gallery")}>
            Gallery
          </button>
          <button
            className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition hover:bg-accent"
            onClick={() => onChangeView("manage")}
          >
            {view === "manage" ? "Managing" : "Manage"}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
