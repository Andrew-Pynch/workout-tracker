class Exercise:
    def __init__(self,
                 _id=None,
                 _exercise=None,
                 _description=None,
                 _bodyGroup=None,
                 _exerciseExample=None):
        self.Id = _id
        self.Exercise = _exercise
        self.Description = _description
        self.BodyGroup = _bodyGroup
        if (_exerciseExample == None):
            self.ExerciseExample = "No Example Available"
        else:
            self.ExerciseExample = _exerciseExample

    def __str__(self):
        formatString = f"""
            ID:             {str(self.Id)}
            Exercise:       {self.Exercise}
            Description:    {self.Description}
            BodyGroup:      {self.BodyGroup}
            ExerciseExample {self.ExerciseExample}  
        """
        return formatString
