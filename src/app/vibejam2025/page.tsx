import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vibejam 2025 Hub | Raymelon',
  description: 'Hub page for Raymelon\'s entries in Vibejam 2025, featuring vibe-coded games.',
};

export default function VibejamHubPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Vibejam 2025 Hub</h1>
      <p className="mb-6 text-lg">
        Welcome to my hub for 2025 Vibe Coding Game Jam!
        <br/>Check my entries below:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">Cowboy Shooter</h2>
          <p className="mb-3">
            A vibe-coded Western adventure blending retro aesthetics with immersive soundscapes.
            Saddle up and explore a dusty, atmospheric world.
          </p>
          <Link href="https://cowboy.raymelon.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Play Cowboy Shooter &rarr;
          </Link>
           <br />
           <Link href="https://cowboy.raymelon.com/about.html" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:underline mt-1 inline-block">
            About Cowboy Shooter
          </Link>
        </div>

        <div className="border p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">Cyber Vibe 2025</h2>
          <p className="mb-3">
            A neon-soaked, vibe-coded journey through a cyberpunk world. Immerse yourself in
            glowing cityscapes and futuristic sounds.
          </p>
          <Link href="https://cybervibe.raymelon.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Play Cyber Vibe 2025 &rarr;
          </Link>
          <br />
           <Link href="https://cybervibe.raymelon.com/about" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:underline mt-1 inline-block">
            About Cyber Vibe 2025
          </Link>
        </div>
      </div>

      <p className="text-center text-gray-600">
        These games were built for 2025 Vibe Coding Game Jam — the first ever hackathon for vibe coded games.
        {/* Optional: Add link to official Vibejam site if desired */}
        <Link href="https://jam.pieter.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"> Learn more about Vibejam</Link>
      </p>
    </main>
  );
}
