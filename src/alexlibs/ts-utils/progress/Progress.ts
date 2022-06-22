import {duration} from '../duration/Duration';

export class Progress {

  constructor(public totalLines: number, public t0 = new Date().getTime()) {
  }

  private previoustN: number = this.t0;
  private previousLines: number = 0;

  readonly snapshot = (lines: number) => {
    const percent = lines / this.totalLines * 100;
    const tN = new Date().getTime();
    const {
      elapsedTime,
      remainingTime: remainingTimeAvg,
      linesPerSecond: linesPerSecondAvg,
    } = this.getMetrics(0, lines, this.t0, tN);
    const {
      remainingTime,
      linesPerSecond,
    } = this.getMetrics(this.previousLines, lines, this.previoustN, tN);
    this.previoustN = tN;
    this.previousLines = lines;
    return {
      percent,
      elapsedTime,
      remainingTime,
      remainingTimeAvg,
      linesPerSecond,
      linesPerSecondAvg,
    };
  };

  private readonly getMetrics = (t0Lines: number, t1Lines: number, t0: number, t1: number) => {
    const linesDone = t1Lines - t0Lines;
    const elapsedTime = t1 - t0;
    const linesPerSecond = linesDone / duration(elapsedTime).toSeconds;
    const remainingTime = (this.totalLines - t1Lines) / (linesDone / elapsedTime);
    return {elapsedTime: duration(elapsedTime), remainingTime: duration(remainingTime), linesPerSecond,};
  };
}
