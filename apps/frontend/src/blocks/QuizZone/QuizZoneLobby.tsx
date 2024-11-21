import CommonButton from '@/components/common/CommonButton';
import ContentBox from '@/components/common/ContentBox';
import CustomAlert from '@/components/common/CustomAlert';
import TextCopy from '@/components/common/TextCopy';
import Typography from '@/components/common/Typogrpahy';
import { useNavigate } from 'react-router-dom';

import { QuizZone } from '@/types/quizZone.types';
interface QuizZoneLobbyProps {
    quizZoneState: QuizZone;
    quizZoneId: string;
    startQuiz: () => void;
    exitQuiz: () => void;
}

// Usage
const QuizZoneLobby = ({ quizZoneState, quizZoneId, startQuiz, exitQuiz }: QuizZoneLobbyProps) => {
    console.log('로비 데이터', quizZoneState);
    const navigate = useNavigate();
    const handleLeave = () => {
        exitQuiz();
        navigate('/');
    };

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
            <img className="w-[20rem]" src="/BooQuizLogo.png" alt="BooQuiz Logo" />
            <ContentBox className="w-full md:min-w-[48rem] min-h-[32rem]">
                <div className="w-full h-full flex flex-row gap-2 items-center justify-center">
                    <ContentBox className="flex-[7] h-full">
                        <div className="w-full flex flex-row justify-between">
                            <div className="flex flex-col">
                                <Typography
                                    text="참가자 목록"
                                    size="base"
                                    color="black"
                                    bold={true}
                                />
                                <Typography
                                    text="현재 접속 중인 참가자들입니다"
                                    size="xs"
                                    color="gray"
                                />
                            </div>
                            {/* <Typography
                                text={`${quizZoneState.players?.length ?? 0} 명`}
                                size="sm"
                                color="black"
                            /> */}
                        </div>
                        {/* <ParticipantGrid
                            participants={quizZoneState.players ?? [{ name: '참가자1' }]}
                            hostId={quizZoneState.hostId}
                        /> */}
                    </ContentBox>
                    <ContentBox className="flex-[3] h-full flex justify-around">
                        <div className="flex flex-col gap-1">
                            <Typography text={`퀴즈정보`} size="2xl" color="black" bold={true} />
                            <Typography
                                text={`퀴즈 시작 전에 퀴즈존 정보를 확인하세요`}
                                size="xs"
                                color="gray"
                                bold={true}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Typography text={`임시 PIN 번호`} size="base" color="black" />
                            <TextCopy size="2xl" bold={true} text={quizZoneId} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Typography text={`퀴즈 개수`} size="base" color="black" />
                            <Typography
                                text={`${quizZoneState.quizCount ?? '?'}문제`}
                                size="2xl"
                                color="black"
                                bold={true}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Typography text={`퀴즈존 참가자수`} size="base" color="black" />
                            {/* <Typography
                                text={` ${quizZoneState.players?.length ?? '?'} 명`}
                                size="2xl"
                                color="black"
                                bold={true}
                            /> */}
                        </div>
                        <div className="flex flex-col gap-2">
                            {true && (
                                <CommonButton
                                    text="퀴즈 시작하기"
                                    clickEvent={() => {
                                        console.log('시작');
                                        startQuiz();
                                    }}
                                />
                            )}
                            <CustomAlert
                                trigger={{
                                    text: '나가기',
                                    variant: 'outline',
                                }}
                                alert={{
                                    title: '메인페이지로 이동하시겠습니까?',
                                    description: '이 작업은 취소할 수 없습니다.',
                                    type: 'info',
                                }}
                                onConfirm={() => handleLeave()}
                                onCancel={() => {}}
                            />
                        </div>
                    </ContentBox>
                </div>
            </ContentBox>
        </div>
    );
};

export default QuizZoneLobby;
