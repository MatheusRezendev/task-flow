import { useTaskView } from "@/hooks/useTaskView";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const stylesheet = {
  root: "flex flex-col gap-2 rounded-xl px-4 space-y-2",
  search: "w-full min-w-[240px]",
  filters: "flex flex-wrap justify-end gap-2",
  button: "rounded-full",
}

export function TaskToolbar() {
    const { setFilter, search, setSearch } = useTaskView();

    return (
        <>
            <div className={stylesheet.root}>
                <Input className={stylesheet.search}
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search tasks..."
                />

                <div className={stylesheet.filters}>
                    <Button className={stylesheet.button} onClick={() => setFilter("all")}>
                        All
                    </Button>
                    <Button className={stylesheet.button} onClick={() => setFilter("completed")}>
                        Completed
                    </Button>
                    <Button className={stylesheet.button} onClick={() => setFilter("pending")}>
                        Pending
                    </Button>
                </div>
            </div>
        </>
    )
}