export default function Centered({ children }: { children: React.ReactNode }) {
  return <div className="grid h-full w-full place-items-center">{children}</div>
}
