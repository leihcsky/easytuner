import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-24 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
      <p className="text-gray-600 mb-8">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="inline-flex px-6 py-3 rounded-full bg-brand-600 text-white font-medium hover:bg-brand-700 transition-colors"
      >
        Back to Guitar Tuner
      </Link>
    </div>
  );
}
