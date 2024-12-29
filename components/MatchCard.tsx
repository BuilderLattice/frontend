import { ArrowUpRight } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

interface BuilderCardProps {
  name: string
  similarMatching: number
  complementaryMatching: number
  linkedinUrl: string
}

const CustomPieChart = ({ value, color }: { value: number, color: string }) => {
  const data = [
    { value: value },
    { value: 100 - value },
  ]

  return (
    <ResponsiveContainer width="100%" height={100}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          startAngle={90}
          endAngle={-270}
          innerRadius={30}
          outerRadius={40}
          paddingAngle={2}
          dataKey="value"
          strokeWidth={0}
        >
          <Cell fill={color} />
          <Cell fill="#e2e8f0" />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default function BuilderCard({ name, similarMatching, complementaryMatching, linkedinUrl }: BuilderCardProps) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase()
  const profilePicture = `https://source.unsplash.com/random/150x150/?portrait&${name.replace(' ', '')}`

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-16 w-16">
          <AvatarImage src={profilePicture} alt={name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-sm text-muted-foreground">Builder Profile</p>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center">
            <CustomPieChart value={similarMatching} color="#3b82f6" />
            <span className="text-sm font-medium mt-2">Similar Matching</span>
            <span className="text-lg font-bold">{similarMatching}%</span>
          </div>
          <div className="flex flex-col items-center">
            <CustomPieChart value={complementaryMatching} color="#10b981" />
            <span className="text-sm font-medium mt-2">Complementary Matching</span>
            <span className="text-lg font-bold">{complementaryMatching}%</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
            Connect on LinkedIn
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

