import {
  BookOpen,
  Briefcase,
  Globe2,
  HandHeart,
  Heart,
  School,
  Sparkles,
  Star,
  Users,
  Wand2,
  Wrench,
  type LucideProps
} from "lucide-react"

import Image from "next/image"

export const iconMap = {
  "sparkles": Sparkles,
  "wand-2": Wand2,
  "wrench": Wrench,
  "book-open": BookOpen,
  "users": Users,
  "briefcase": Briefcase,
  "globe-2": Globe2,
  "hand-heart": HandHeart,
  "heart": Heart,
  "star": Star,
  "school": School,
}

export type ProgramIconName = keyof typeof iconMap

export function ProgramIcon({ name, logo, ...props }: LucideProps & { name: string; logo?: string }) {
  if (logo) {
    return (
      <div className="relative h-full w-full">
        <Image src={logo} alt="" fill className="object-contain" />
      </div>
    )
  }
  const Icon = iconMap[name as ProgramIconName] || Sparkles
  return <Icon {...props} />
}
