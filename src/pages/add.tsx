import { useForm } from "react-hook-form";
import { Button } from "~/components/shadcn/Button";
import { BodyGroup, Exercise } from "@prisma/client";
import React, { useState } from "react";
import { PrimaryButton } from "old/src/components/themed/CustomButtons";

type FormData = {
  exercise: Exercise;
};

const Add = () => {
  const { control, register, handleSubmit, formState } = useForm<FormData>();
  const { errors } = formState;

  const [bodyGroup, setBodyGroup] = useState<BodyGroup>(BodyGroup.CHEST);
  const [position, setPosition] = useState("");

  const onSubmit = (data: FormData) => {
    // Your logic for submitting the form
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="flex flex-col items-center space-y-2">
        <PrimaryButton
          className="w-full"
          selected={bodyGroup === BodyGroup.CHEST}
        >
          {BodyGroup.CHEST}
        </PrimaryButton>
        <PrimaryButton
          className="w-full"
          selected={bodyGroup === BodyGroup.ARMS}
        >
          {BodyGroup.ARMS}
        </PrimaryButton>
        <PrimaryButton
          className="w-full"
          selected={bodyGroup === BodyGroup.SHOULDERS}
        >
          {BodyGroup.SHOULDERS}
        </PrimaryButton>
        <PrimaryButton
          className="w-full"
          selected={bodyGroup === BodyGroup.BACK}
        >
          {BodyGroup.BACK}
        </PrimaryButton>
        <PrimaryButton
          className="w-full"
          selected={bodyGroup === BodyGroup.CORE}
        >
          {BodyGroup.CORE}
        </PrimaryButton>
        <PrimaryButton
          className="w-full"
          selected={bodyGroup === BodyGroup.LEGS}
        >
          {BodyGroup.LEGS}
        </PrimaryButton>
      </div>

      <div className="form-group">
        {errors.exercise?.bodyGroup && <span>This field is required</span>}
      </div>

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

      <Button>Add</Button>
    </form>
  );
};

export default Add;
