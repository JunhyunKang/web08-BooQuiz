import { BadRequestException, Controller, Get, HttpCode, Post, Session } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuizZoneService } from './quiz-zone.service';
import { WaitingQuizZoneDto } from './dto/waiting-quiz-zone.dto';

@ApiTags('Quiz Zone')
@Controller('quiz-zone')
export class QuizZoneController {
    constructor(private readonly quizZoneService: QuizZoneService) {}

    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: '새로운 퀴즈존 생성' })
    @ApiResponse({ status: 201, description: '퀴즈존이 성공적으로 생성되었습니다.' })
    @ApiResponse({ status: 400, description: '세션 정보가 없습니다.' })
    async create(@Session() session: Record<string, any>): Promise<void> {
        const sessionId = session.id;

        if (sessionId === undefined) {
            throw new BadRequestException('세션 정보가 없습니다.');
        }

        await this.quizZoneService.create(sessionId);
    }

    @Get(':id')
    @HttpCode(200)
    @ApiOperation({ summary: '퀴즈존 대기실 정보 조회' })
    @ApiParam({ name: 'id', description: '퀴즈존의 ID' })
    @ApiResponse({
        status: 200,
        description: '대기실 정보가 성공적으로 반환되었습니다.',
        type: WaitingQuizZoneDto,
    })
    @ApiResponse({ status: 400, description: '세션 정보가 없습니다.' })
    async findOne(@Session() session: Record<string, any>): Promise<WaitingQuizZoneDto> {
        const sessionId = session.id;
        if (sessionId === undefined) {
            throw new BadRequestException('세션 정보가 없습니다.');
        }
        return this.quizZoneService.getQuizWaitingRoom(sessionId);
    }
}