class Exercise:
    def __init__(self,
                 _id=None,
                 _userId=None,
                 _exercise=None,
                 _description=None,
                 _bodyGroupId=None,
                 _exerciseExample=None):
        self.Id = _id
        self.UserId = _userId
        self.Exercise = _exercise
        if (_description == None):
            self.Description = "No Description Available"
        else:
            self.Description = _description
        self.BodyGroupId = _bodyGroupId
        if (_exerciseExample == None):
            self.ExerciseExample = "No Example Available"
        else:
            self.ExerciseExample = _exerciseExample

    def __str__(self):
        formatString = f"""
            ID:             {str(self.Id)}
            UserId:         {str(self.UserId)}
            Exercise:       {self.Exercise}
            Description:    {self.Description}
            BodyGroupId:    {self.BodyGroupId}
            ExerciseExample {self.ExerciseExample}  
        """
        return formatString

    def GetInsertStatement(self):
        sql = f"""
                INSERT INTO exercise(userId, exercise, description, bodyGroupId, exerciseExample) 
                VALUES (
                    '{self.UserId}',
                    '{self.Exercise}', 
                    '{self.Description}', 
                    '{self.BodyGroupId}',
                    '{self.ExerciseExample}'
                )
            """
        print(f"SQL: {sql}")
        return sql
