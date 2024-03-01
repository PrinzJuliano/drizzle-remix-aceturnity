import type { MetaFunction } from "@remix-run/node";
import { BackgroundGradient } from '~/components/ui/background-gradient';
import { useNavigate } from "@remix-run/react"


export const meta: MetaFunction = () => {
  return [
    {title: "Drizzle Experiment"},
    {name: "description", content: "Welcome to a drizzle experiment!"},
  ];
};

export default function Index() {
  let navigate = useNavigate();
  return (
    <div className="flex justify-center m-2">
      <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          TailwindCSS + Aceternity
        </p>

        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          A demo for drizzle orm running in remix
        </p>
        <button onClick={() => navigate('/todo')}
                className="rounded-full pl-4 pr-1 py-1 m-0 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
          <span>Check it out </span>
          <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
            now
          </span>
        </button>
      </BackgroundGradient>
    </div>
  );
}
