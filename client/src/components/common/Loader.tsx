export default function Loader({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-2',
    large: 'w-12 h-12 border-3',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <span className={`${sizeClasses[size]} border-luxury-gold/30 border-t-luxury-gold rounded-full animate-spin`} />
      <span className="text-[9px] uppercase font-bold tracking-widest text-luxury-charcoal/40">
        Compiling asset pipeline...
      </span>
    </div>
  );
}
