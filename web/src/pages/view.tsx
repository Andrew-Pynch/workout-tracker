import { useSession } from "next-auth/react";
import Menu from "~/components/menu";
import { EMenuOption } from "~/domain/eMenuOption";
import { api } from "~/utils/api";

type ViewProps = {};

const View = (props: ViewProps) => {
  const { data: session } = useSession();
  const { data: exercises } = api.exercise.getAllByUserId.useQuery({
    userId: session?.user.id as string,
  });

  console.log("exercises", exercises);

  if (exercises === undefined) return <p>Loading...</p>;
  return (
    <div
      className={`
         text-black
    `}
    >
      <Menu option={EMenuOption.VIEW} />

      <div className="h-96 w-full max-w-2xl overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {/* Add the other headers here */}
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                BodyGroup
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Exercise
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Sets
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Reps
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Weight
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {exercises.map((exercise) => (
              <tr key={exercise.id}>
                <td className="whitespace-nowrap px-6 py-4">
                  {exercise.bodyGroup}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {new Date(exercise.date).toLocaleDateString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {exercise.exercise}
                </td>{" "}
                <td className="whitespace-nowrap px-6 py-4">{exercise.sets}</td>
                <td className="whitespace-nowrap px-6 py-4">{exercise.reps}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  {exercise.weight}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default View;
