import { json, useLoaderData } from '@remix-run/react';
import { getTodo } from '~/data/getdata.server';
import { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { BackgroundGradient } from '~/components/ui/background-gradient';
import { SparklesCore } from '~/components/ui/sparkles';

export const loader = async ({params}: LoaderFunctionArgs) => {
  invariant(params.dataId, "Missing dataId param");
  invariant(!isNaN(+params.dataId), "dataId must be a number")
  const data = await getTodo(+params.dataId);
  console.log(data)
  if (!data) {
    throw new Response("Not Found", {status: 404});
  }
  return json({data: data});
};

export const meta: MetaFunction<typeof loader> = (
  {
    data,
  }
) => {
  return [{title: `Drizzle Experiment - Todos - ${(data?.text?.substring(0, 10) ?? ' - Not Found -')}`}];
};

export default function DataView() {
  const {data} = useLoaderData<typeof loader>();
  return (<div
      className="h-screen relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
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
      {!data ? <div>Loading ...</div> :
        <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
          <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
            #{data.id}
          </p>

          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {data.text}
          </p>

          {data.todoToTags.length ? <div className="flex">
            {
              data.todoToTags.map(({tag}) => <span
                className="rounded-full px-4 py-1 mr-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
                {tag.name}
              </span>)}
          </div> : null}
        </BackgroundGradient>}
    </div>
  )
}
