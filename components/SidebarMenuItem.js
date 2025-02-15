export default function SidebarMenuItem({text,Icon,active}) {
  return (
    <div className="hoverEffect flex items-center text-gray-700 justify-start text-lg space-x-2">
        <Icon className="h-6"/> 
        <span className={`${active && "font-bold"} hidden xl:inline`}>{text}</span>
    </div>
  )
}
