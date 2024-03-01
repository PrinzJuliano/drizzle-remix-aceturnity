import { json, Link, useLoaderData } from '@remix-run/react';
import { getTodos } from '~/data/getdata.server';
import { SparklesCore } from '~/components/ui/sparkles';
import { MetaFunction } from '@remix-run/node';

export const loader = async () => {
  const data = await getTodos();
  return json({data});
};

export const meta: MetaFunction = () => {
  return [
    {title: "Drizzle Experiment - Todos"},
    {name: "description", content: "View some Todos"},
  ];
};

export default function DataView() {
  const {data} = useLoaderData<typeof loader>();
  return (
    <>
      <div
        className="h-screen relative w-full bg-black flex flex-col items-center overflow-hidden rounded-md">
        <div className="w-full absolute inset-0 h-screen">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>
        <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20 mb-5">
          Todos
        </h1>
        {data.length === 0 ? <>
          <h1 className="text-3xl dark:text-white">No Todos open</h1>
        </> : null}

        {data.length > 0 ?
          <div className="relative flex flex-col text-gray-700 bg-white dark:bg-zinc-800 shadow-md w-96 rounded-xl bg-clip-border">
            <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 dark:text-white">
              {data.map((todo) =>
                (

                  <Link key={todo.id} role="button" to={`/todo/${todo.id}`}
                       className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                    {todo.text}
                  </Link>
                )
              )}
            </nav>
          </div> : null}
      </div>
    </>
  )
}
