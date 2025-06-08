import Image from 'next/image'
import clsx from 'clsx'

export default function Card({
  icon,
  title,
  description,
  theme,
  size,
  selected
}: {
  icon: string
  title: string
  description: string
  theme?: string
  size?: string
  selected: boolean
}) {
  return (
    <div
      className={clsx(
        'flex flex-row items-center gap-3 rounded-lg p-4 bg-white w-full border border-solid border-[rgb(217,217,217)] cursor-pointer',
        selected && 'border-[rgb(29,6,238)]'
      )}
    >
      <Image
        src={icon}
        alt={title}
        priority={false}
        quality={80}
        width={60}
        height={60}
      />
      <div>
        <h2 className="text-base font-medium whitespace-nowrap">{title}</h2>
        <p className="text-muted-foreground text-sm whitespace-nowrap">
          {description}
        </p>
      </div>
    </div>
  )
}
