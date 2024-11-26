import ContentBox from '@/components/common/ContentBox';
import Typography from '@/components/common/Typogrpahy';
import { useTimer } from '@/hook/useTimer';
import { useEffect } from 'react';
import { CurrentQuizResult } from '@/types/quizZone.types.ts';
import PlayersGrid from '@/components/common/PlayersGrid.tsx';

interface QuizCompletedProps {
    isLastQuiz: boolean;
    deadlineTime: number;
    currentQuizResult?: CurrentQuizResult;
}

const QuizCompleted = ({ isLastQuiz, deadlineTime, currentQuizResult }: QuizCompletedProps) => {
    const currentTime = new Date().getTime();
    const remainingPrepTime = Math.max(0, deadlineTime - currentTime) / 1000;

    const { fastestPlayers, submittedCount } = currentQuizResult ?? {};
    const { start, time } = useTimer({
        initialTime: remainingPrepTime,
        onComplete: () => {},
    });

    useEffect(() => {
        start();
    }, []);
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
            {currentQuizResult && (
                <ContentBox>
                    <Typography
                        size="xl"
                        color="black"
                        text={`${submittedCount}명 제출 완료`}
                        bold={true}
                    />
                    <PlayersGrid players={fastestPlayers ?? []} hostId={'1234'} />
                </ContentBox>
            )}
            <ContentBox>
                <div className="w-full flex flex-col items-center gap-2">
                    <Typography
                        size="3xl"
                        color="blue"
                        text={isLastQuiz ? '결과를 산출 중입니다.' : '다음 퀴즈를 준비 중입니다.'}
                        bold={true}
                    />
                    <Typography size="3xl" color="blue" text="잠시만 기다려주세요" bold={true} />
                    {!isLastQuiz && time !== null && (
                        <div className="w-full flex flex-row justify-center items-end">
                            <Typography
                                size="3xl"
                                color="blue"
                                text={`${time.toFixed(1)}`}
                                bold={true}
                            />
                            <Typography
                                size="base"
                                color="blue"
                                text={` 초 뒤에 다음문제로 넘어갑니다`}
                                bold={true}
                            />
                        </div>
                    )}
                </div>
            </ContentBox>
        </div>
    );
};

export default QuizCompleted;
