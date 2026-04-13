"use client";

export default function UnauthorizedPage(props: { no_margin?: boolean }) {
  const { no_margin } = props;

  return (
    <div
      className={`h-screen flex flex-col p-2 lg:px-4 ${no_margin ? "" : "lg:mt-[-8vh]"}`}
    >
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold">401 - </h1>
        <p>Unauthorized</p>
      </div>
    </div>
  );
}