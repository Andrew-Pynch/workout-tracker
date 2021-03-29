using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace API.Model
{
    public partial class workout_trackerContext : DbContext
    {
        public workout_trackerContext()
        {
        }

        public workout_trackerContext(DbContextOptions<workout_trackerContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Bodygroup> Bodygroup { get; set; }
        public virtual DbSet<Exercise> Exercise { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<Workoutlog> Workoutlog { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseMySQL("server=localhost;port=3306;user=root;password=6runehe_;database=workout_tracker");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Bodygroup>(entity =>
            {
                entity.ToTable("bodygroup");

                entity.Property(e => e.Name).HasMaxLength(45);
            });

            modelBuilder.Entity<Exercise>(entity =>
            {
                entity.ToTable("exercise");

                entity.HasIndex(e => e.BodyGroupId)
                    .HasName("fk_exercise_bodygroup1_idx");

                entity.HasIndex(e => e.UserId)
                    .HasName("fk_exercise_user_idx");

                entity.Property(e => e.Name).HasMaxLength(150);

                entity.HasOne(d => d.BodyGroup)
                    .WithMany(p => p.Exercise)
                    .HasForeignKey(d => d.BodyGroupId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_exercise_bodygroup1");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Exercise)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_exercise_user");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user");

                entity.Property(e => e.Email).HasMaxLength(45);

                entity.Property(e => e.FirstName).HasMaxLength(45);

                entity.Property(e => e.LastName).HasMaxLength(45);
            });

            modelBuilder.Entity<Workoutlog>(entity =>
            {
                entity.ToTable("workoutlog");

                entity.HasComment("										\\\\n\\\\n\\\\n\\\\n");

                entity.HasIndex(e => e.BodyGroupId)
                    .HasName("fk_workoutlog_bodygroup1_idx");

                entity.HasIndex(e => e.UserId)
                    .HasName("fk_workoutlog_user1_idx");

                entity.Property(e => e.Date).HasColumnType("date");

                entity.HasOne(d => d.BodyGroup)
                    .WithMany(p => p.Workoutlog)
                    .HasForeignKey(d => d.BodyGroupId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_workoutlog_bodygroup1");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Workoutlog)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_workoutlog_user1");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
