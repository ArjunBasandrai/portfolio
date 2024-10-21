export default function Hero() {
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black flex items-center">
      <div className="container px-4 mx-auto">
        <p className="text-6xl lg:text-7xl text-white font-Bodoni">
          Arjun{' '}
          <span className="bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
            Basandrai
          </span>
        </p>
        <p className="max-w-3xl mt-4 text-gray-400 text-base sm:text-lg">
          Hi! I&apos;m <span className="text-white">Arjun</span>, a machine learning enthusiast with a passion for creating intelligent solutions. When I&apos;m not coding, you&apos;ll find me exploring the outdoors, capturing the beauty of wildlife through my lens.
        </p>
      </div>
    </div>
  );
}
