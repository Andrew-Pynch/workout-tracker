
import { Exercise } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Dropdown from "~/components/themed/Dropdown";
import { EBodyGroup } from "~/domain/EBodyGroup";

import { api } from "~/utils/api";


const View = () => {
  const [bodyGroup, setBodyGroup] = useState<string>();

  const { data: exercises } = api.exercise.getAllForUser.useQuery();
  const { data: exercisesByBodyGroup } =
    api.exercise.getAllForUserByBodyGroup.useQuery({
      bodyGroup: bodyGroup ?? "",
    });

  const [valuesToUse, setValuesToUse] = useState<Exercise[]>([]);

  useEffect(() => {
    console.log("exercises", exercises);
    console.log("exercisesByBodyGroup", exercisesByBodyGroup);

    if (bodyGroup === undefined) setValuesToUse(exercises ?? []);
    else if (exercisesByBodyGroup) setValuesToUse(exercisesByBodyGroup);
    else setValuesToUse([]);
  }, [exercises, exercisesByBodyGroup, bodyGroup]);

  if (exercisesByBodyGroup === undefined && exercises) return <p>Loading...</p>;
  return (
    <div
      className={`
         flex
         flex-col
         items-center
         text-black
    `}
    >
      <p
        className={`

           text-white
      `}
      >
        Body Group
      </p>
      <Dropdown
        options={Object.values(EBodyGroup)}
        selectedOption={bodyGroup}
        setSelectedOption={setBodyGroup}
      />

      <div className="mt-4 h-96 w-full max-w-2xl overflow-auto">
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
            {valuesToUse.map((exercise) => (
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
