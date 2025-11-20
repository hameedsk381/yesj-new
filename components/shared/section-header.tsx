interface SectionHeaderProps {
  title: string
  description?: string
  align?: "left" | "center" | "right"
  titleColor?: "primary"
  subtitle?: string
  subtitleColor?: "primary"
}

export default function SectionHeader({
  title,
  description,
  align = "center",
  titleColor = "primary",
  subtitle,
  subtitleColor = "primary",
}: SectionHeaderProps) {
  const alignClass = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  }

  const titleColorClass = {
    primary: "text-primary",
  }

  const subtitleColorClass = {
    primary: "text-primary",
  }

  return (
    <div className={`flex flex-col ${alignClass[align]} justify-center space-y-4 mb-12`}>
      <div className="space-y-2">
        {subtitle && (
          <div className="flex items-center gap-2 mb-4">
            {align !== "right" && <div className="h-1 w-12 bg-primary"></div>}
            <span className={`text-sm font-light ${subtitleColorClass[subtitleColor]}`}>{subtitle}</span>
            {align !== "left" && <div className="h-1 w-12 bg-primary"></div>}
          </div>
        )}
        <h2 className={`text-3xl font-light tracking-tighter sm:text-4xl ${titleColorClass[titleColor]}`}>{title}</h2>
        {description && (
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-extralight">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}