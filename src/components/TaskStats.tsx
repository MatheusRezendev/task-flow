import type { TaskStats } from "../types/taskStats";

import { Card,
    CardContent,
    CardHeader,
    CardTitle
 } from "./ui/card";

type TaskStatsProps = TaskStats

const stylesheet = {
  section: "space-y-4",
  header: "space-y-1",
  title: "text-lg font-semibold",
  description: "text-sm text-muted-foreground",
  grid: "grid grid-cols-1 gap-3 sm:grid-cols-3",
  card: "gap-0 overflow-hidden",
  cardContent: "space-y-2 py-5",
  label: "text-sm text-muted-foreground",
  value: "text-2xl font-semibold tracking-tight",
}


export function TaskStats({ total, completed, pending }: TaskStatsProps) {
    return <>
        <section className={stylesheet.section}>
            <div className={stylesheet.header}>
                <h2 className={stylesheet.title}>Tasks Stats</h2>
            </div>
            <div className={stylesheet.grid}>
                <Card className={stylesheet.card}>
                    <CardHeader className={stylesheet.header}>
                        <CardTitle className={stylesheet.title}>Total Tasks</CardTitle>
                    </CardHeader>
                    <CardContent className={stylesheet.cardContent}>
                        <p className={stylesheet.value}>{total}</p>
                    </CardContent>
                </Card>
                <Card className={stylesheet.card}>
                    <CardHeader className={stylesheet.header}>
                        <CardTitle className={stylesheet.title}>Completed Tasks</CardTitle>
                    </CardHeader>
                    <CardContent className={stylesheet.cardContent}>
                        <p className={stylesheet.value}>{completed}</p>
                    </CardContent>
                </Card>
                <Card className={stylesheet.card}>
                    <CardHeader className={stylesheet.header}>
                        <CardTitle className={stylesheet.title}>Pending Tasks</CardTitle>
                    </CardHeader>
                    <CardContent className={stylesheet.cardContent}>
                        <p className={stylesheet.value}>{pending}</p>
                    </CardContent>
                </Card>
            </div>
        </section>
    </>
}