package pokedex.pxt.mbo.pokedex.config;

import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.boot.autoconfigure.batch.BatchProperties.Job;
import org.springframework.context.annotation.Bean;
import org.springframework.transaction.PlatformTransactionManager;

import net.bytebuddy.asm.MemberSubstitution.Substitution.Chain.Step;

public class TaskletBatch {
	private final JobRepository jobRepository;
	private final PlatformTransactionManager transactionManager;

	public SampleTaskletJob(JobRepository jobRepository, PlatformTransactionManager transactionManager) {
		this.jobRepository = jobRepository;
		this.transactionManager = transactionManager;
	}

	@Bean(name = "firstJob")
	public Job firstJob() {
		return new JobBuilder("First Job", jobRepository)
				.start(firstStep())
				.next(secondStep())
				.build();
	}

	public Step firstStep() {
		return new StepBuilder("First Step", jobRepository)
				.tasklet(firstTask(), transactionManager)
				.build();
	}

	public Step secondStep() {
		return new StepBuilder("Second Step", jobRepository)
				.tasklet(secondTask(), transactionManager)
				.build();
	}

	public Tasklet firstTask() {
		return new Tasklet() {
			@Override
			public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
				System.out.println("★This is the First task!!!!!");
				return RepeatStatus.FINISHED;
			}
		};
	}

	public Tasklet secondTask() {
		return new Tasklet() {
			@Override
			public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
				System.out.println("★★This is the Second task!!!!!");
				return RepeatStatus.FINISHED;
			}
		};
	}
}
