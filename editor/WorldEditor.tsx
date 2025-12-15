"use client"
export default function WorldEditor({ world }: any) {
  return (
    <div className="fixed top-4 right-4 bg-black/70 p-3">
      <button onClick={() => world.city.grow()}>
        Grow City
      </button>
      <button onClick={() =>
        world.politics.propose("Tax Cut", w =>
          w.economy.earn("gold", 5)
        )
      }>
        New Law
      </button>
    </div>
  )
}