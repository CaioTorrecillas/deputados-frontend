"use client";
type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  open: boolean;
};
export default function SidebarItem({ icon, label, open }: SidebarItemProps) {
  return (
    <li style={{ margin: "10px 0" }}>
      {icon} {open && label}
    </li>
  );
}