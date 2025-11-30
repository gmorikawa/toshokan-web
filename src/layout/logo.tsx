export interface LogoProps {
    width?: number;
    height?: number;
}

export function Logo({ width = 100, height }: LogoProps) {
    return <img src="/logo.png" alt="Logo" width={width} height={height} />;
}