# MVP Functionality

## Add workouts to the workouts table

-   Basic Prompts
    -   Which exercise are you doing today?
    -   How many sets / reps do you think you can do today?
    -   How much weight do you think you can do at those reps?
    -   How many sets / reps did you ACTUALLY do today?
    -   What weight did you ACTUALLY lift??

# Scaffold Db Context Commands

```
Scaffold-DbContext "server=localhost;port=3306;user=root;password=6runehe_;database=workout_tracker" MySql.EntityFrameworkCore -OutputDir Model -f
```
