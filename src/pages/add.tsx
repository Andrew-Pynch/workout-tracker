import { useForm } from "react-hook-form";
import { Button } from "~/components/shadcn/Button";
import { BodyGroup, Exercise } from "@prisma/client";
import React, { useState } from "react";
import { api } from "~/utils/api";
import { PrimaryButton } from "~/components/themed/buttons/CustomButtons";
import { Select } from "~/components/shadcn/Select";
import { FaDivide } from "react-icons/fa";
import Divider from "~/components/themed/Divider";
import GenericModal from "~/components/themed/GenericModal";
import { toast } from "react-toastify";

type FormData = {
  exercise: Exercise;
};

const Add = () => {
  const { register, handleSubmit, formState, watch, reset } =
    useForm<FormData>();
  const { errors } = formState;
  const selectedExercise = watch("exercise.exercise");

  const [bodyGroup, setBodyGroup] = useState<BodyGroup>(BodyGroup.CHEST);
  const [showModal, setShowModal] = useState<boolean>(false);

  const addMutation = api.exercise.add.useMutation();
  const { data: exercises, isLoading: exercisesIsLoading } =
    api.exercise.getAllDistinctForBodyGroup.useQuery({
      bodyGroup: bodyGroup,
    });
  const {
    data: threeMostRecentForBodyGroupAndExercise,
    isLoading: threeMostRecentForBodyGroupAndExerciseIsLoading,
  } = api.exercise.getThreeMostRecentForBodyGroupAndExercise.useQuery({
    bodyGroup: bodyGroup,
    exercise: selectedExercise,
  });

  const onSubmit = (data: FormData) => {
    addMutation.mutate(
      {
        date: new Date(),
        bodyGroup: bodyGroup,
        exercise: data.exercise.exercise,
        sets: Number(data.exercise.sets),
        reps: Number(data.exercise.reps),
        weight: Number(data.exercise.weight),
      },
      {
        onSuccess: () => {
          toast.success("Exercise added successfully");
          reset();
        },
        onError: () => {
          toast.error("Error adding exercise");
        },
      },
    );
  };

  return (
    <div className="flex max-w-[90%] flex-col">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center space-y-2">
          <PrimaryButton
            className="w-full"
            selected={bodyGroup === BodyGroup.CHEST}
            onClick={() => setBodyGroup(BodyGroup.CHEST)}
          >
            {BodyGroup.CHEST}
          </PrimaryButton>
          <PrimaryButton
            className="w-full"
            selected={bodyGroup === BodyGroup.ARMS}
            onClick={() => setBodyGroup(BodyGroup.ARMS)}
          >
            {BodyGroup.ARMS}
          </PrimaryButton>
          <PrimaryButton
            className="w-full"
            selected={bodyGroup === BodyGroup.SHOULDERS}
            onClick={() => setBodyGroup(BodyGroup.SHOULDERS)}
          >
            {BodyGroup.SHOULDERS}
          </PrimaryButton>
          <PrimaryButton
            className="w-full"
            selected={bodyGroup === BodyGroup.BACK}
            onClick={() => setBodyGroup(BodyGroup.BACK)}
          >
            {BodyGroup.BACK}
          </PrimaryButton>
          <PrimaryButton
            className="w-full"
            selected={bodyGroup === BodyGroup.CORE}
            onClick={() => setBodyGroup(BodyGroup.CORE)}
          >
            {BodyGroup.CORE}
          </PrimaryButton>
          <PrimaryButton
            className="w-full"
            selected={bodyGroup === BodyGroup.LEGS}
            onClick={() => setBodyGroup(BodyGroup.LEGS)}
          >
            {BodyGroup.LEGS}
          </PrimaryButton>
        </div>

        <div className="form-group">
          {errors.exercise?.bodyGroup && <span>This field is required</span>}
        </div>

        <Divider />

        <div className="form-group mt-4 w-full">
          <label>Exercise: </label>
          <select {...register("exercise.exercise", { required: true })}>
            <option value="" disabled>
              Select an exercise
            </option>
            {exercises?.map((exerciseItem, index) => (
              <option key={index} value={exerciseItem.exercise}>
                {exerciseItem.exercise}
              </option>
            ))}
          </select>
          {errors.exercise?.exercise && <span>This field is required</span>}
        </div>

        <Divider />

        {threeMostRecentForBodyGroupAndExercise &&
          !threeMostRecentForBodyGroupAndExerciseIsLoading && (
            <div className="max-w-full overflow-x-auto">
              <h4>Most Recent Workouts</h4>
              <table className="divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Date
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
                  {threeMostRecentForBodyGroupAndExercise.map((exercise) => {
                    return (
                      <tr
                        key={exercise.id}
                        onClick={() => {
                          setShowModal(true);
                        }}
                        className={`
                         text-black
                    `}
                      >
                        <td className="whitespace-nowrap px-6 py-4">
                          {new Date(exercise.date).toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {exercise.sets}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {exercise.reps}
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                          {exercise.weight}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        <Divider />

        <div className="flex flex-col gap-4">
          <div className="form-group w-full">
            <label>Sets</label>
            <input
              type="number"
              {...register("exercise.sets", { required: true })}
            />
            {errors.exercise?.sets && <span>This field is required</span>}
          </div>

          <div className="form-group w-full">
            <label>Reps</label>
            <input
              type="number"
              {...register("exercise.reps", { required: true })}
            />
            {errors.exercise?.reps && <span>This field is required</span>}
          </div>

          <div className="form-group w-full">
            <label>Weight</label>
            <input
              type="number"
              {...register("exercise.weight", { required: true })}
            />
            {errors.exercise?.weight && <span>This field is required</span>}
          </div>
        </div>

        <Button className="w-full bg-tertiary text-primary hover:text-tertiary">
          Add
        </Button>
      </form>
      {showModal && (
        <GenericModal
          title="Update Exercise"
          description="Update your exercise"
          ctaText="Update"
          cancelText="Cancel"
          setShowModal={setShowModal}
        >
          <div className="flex flex-col gap-4">
            <div className="form-group w-full">
              <label>Sets</label>
              <input
                type="number"
                {...register("exercise.sets", { required: true })}
              />
              {errors.exercise?.sets && <span>This field is required</span>}
            </div>

            <div className="form-group w-full">
              <label>Reps</label>
              <input
                type="number"
                {...register("exercise.reps", { required: true })}
              />
              {errors.exercise?.reps && <span>This field is required</span>}
            </div>

            <div className="form-group w-full">
              <label>Weight</label>
              <input
                type="number"
                {...register("exercise.weight", { required: true })}
              />
              {errors.exercise?.weight && <span>This field is required</span>}
            </div>
          </div>
        </GenericModal>
      )}
    </div>
  );
};

export default Add;
