import { Hero } from "../components/hero";
import { Trending } from "../components/trending";

export function Home(){
    return (
        <div className="h-full overflow-hidden">
            <Hero/>
            <Trending/>
        </div>
    )
}