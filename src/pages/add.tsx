import { useSession } from "next-auth/react";
import { useState } from "react";

import { api } from "~/utils/api";

type AddProps = {};

// const Add = (props: AddProps) => {
//   const [bodyGroup, setBodyGroup] = useState<string>("");
//   const [exercise, setExercise] = useState<string>("");
//   const [sets, setSets] = useState<number>(0);
//   const [reps, setReps] = useState<number>(0);
//   const [weight, setWeight] = useState<number>(0);
//
//   const utils = api.useContext();
//
//   const { data: session } = useSession();
//   const { data: exercisesByBodyGroup } =
//     api.exercise.getAllNamesByUserIdAndBodyGroup.useQuery({
//       userId: session?.user.id as string,
//       bodyGroup: bodyGroup,
//     });
//
//   const { data: mostRecentExercisesByExerciseAndBodyGroup } =
//     api.exercise.get3MostRecentExercisesByExerciseAndBodyGroup.useQuery({
//       bodyGroup: bodyGroup,
//       exercise: exercise,
//     });
//
//   const postExercise = api.exercise.add.useMutation({
//     onMutate: async (newEntry) => {
//       await utils.exercise.getAll.cancel();
//     },
//     onSettled: async () => {
//       await utils.exercise.getAll.invalidate();
//       setBodyGroup("");
//       setExercise("");
//       setSets(0);
//       setReps(0);
//       setWeight(0);
//     },
//   });
//
//   if (!session?.user) return <SignInRequest />;
//   return (
//     <div
//       className={`
//         m
//         fixed
//         top-40
//         mt-0
//         flex
//         max-h-[calc(100vh-292px)]
//         w-full
//         flex-col
//         items-center
//         overflow-y-scroll
//         sm:mt-40
//         md:mt-0
//     `}
//     >
//       <p>Body Group</p>
//       <Dropdown
//         options={Object.values(EBodyGroup)}
//         selectedOption={bodyGroup}
//         setSelectedOption={setBodyGroup}
//       />
//       <div
//         className={`
//            mb-8
//
//            rounded-lg
//            bg-violet-600
//       `}
//       >
//         {exercisesByBodyGroup && exercisesByBodyGroup.length > 0 ? (
//           <div className="flex flex-wrap">
//             {exercisesByBodyGroup.map((obj) => {
//               const _exercise = obj.exercise;
//               const isSelected = _exercise === exercise;
//               return (
//                 <button
//                   className={`
//                    ${isSelected ? "bg-gray-200" : ""}
//                    w-full
//                    px-2
//                    py-2 
//                    hover:bg-gray-500 
//                    sm:w-1/2 
//                    md:w-1/3
//                    lg:w-1/4
//               `}
//                   onClick={() => {
//                     setExercise(_exercise);
//                   }}
//                 >
//                   <p className="break-words">{_exercise}</p>
//                 </button>
//               );
//             })}
//           </div>
//         ) : (
//           <p>Select a body group</p>
//         )}
//       </div>
//       <div>
//         {mostRecentExercisesByExerciseAndBodyGroup &&
//         mostRecentExercisesByExerciseAndBodyGroup.length > 0 ? (
//           <div className="flex flex-wrap">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
//                     Date
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
//                     Sets
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
//                     Reps
//                   </th>
//
//                   <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
//                     Weight
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200 bg-white">
//                 {mostRecentExercisesByExerciseAndBodyGroup.map((exercise) => {
//                   return (
//                     <tr
//                       key={exercise.id}
//                       className={`
//                          text-black
//                     `}
//                     >
//                       <td className="whitespace-nowrap px-6 py-4">
//                         {new Date(exercise.date).toLocaleDateString()}
//                       </td>
//                       <td className="whitespace-nowrap px-6 py-4">
//                         {exercise.sets}
//                       </td>
//                       <td className="whitespace-nowrap px-6 py-4">
//                         {exercise.reps}
//                       </td>
//
//                       <td className="whitespace-nowrap px-6 py-4">
//                         {exercise.weight}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <p>Select an exercise</p>
//         )}
//       </div>
//       <div
//         className={`
//            mt-4 
//            mr-2 
//            flex 
//            flex-col 
//            items-center 
//            justify-center
//            space-x-1
//            sm:flex-row
//       `}
//       >
//         <Input
//           type="number"
//           label="sets"
//           value={sets}
//           onValueChange={(v) => setSets(parseInt(v))}
//         />
//         <Input
//           type="number"
//           label="reps"
//           value={reps}
//           onValueChange={(v) => setReps(parseInt(v))}
//         />
//         <Input
//           type="number"
//           label="weight"
//           value={weight}
//           onValueChange={(v) => setWeight(parseInt(v))}
//         />
//       </div>
//
//       <div>
//         <h2>{exercise}</h2>
//       </div>
//       <PrimaryButton
//         label="Add"
//         className={`
//              bg-green-500
//         `}
//         onClick={() => {
//           postExercise.mutate({
//             userId: session?.user.id ?? "ERROR",
//             bodyGroup: bodyGroup,
//             date: new Date(),
//             exercise: exercise,
//             sets: sets,
//             reps: reps,
//             weight: weight,
//           });
//         }}
//       />
//     </div>
//   );
// };
//
// export default Add;
