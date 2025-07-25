declare module '@geod-dev/talkinghead' {
    import type {Quaternion, Vector3} from "three";

    type Color = number | string

    type Mood = "neutral" | "happy" | "angry" | "sad" | "fear" | "disgust" | "love" | "sleep"

    interface ViewOptions {
        cameraView?: 'full' | 'mid' | 'upper' | 'head'
        cameraDistance?: number
        cameraX?: number
        cameraY?: number,
    }

    interface LightOptions {
        lightAmbientColor?: Color
        lightAmbientIntensity?: number
        lightDirectColor?: Color
        lightDirectIntensity?: number
        lightDirectPhi?: number
        lightDirectTheta?: number
        lightSpotIntensity?: number
        lightSpotColor?: Color
        lightSpotPhi?: number
        lightSpotTheta?: number
        lightSpotDispersion?: number,
    }

    interface StreamStartOptions {
        sampleRate: number
        gain: number
        lipsyncLang: string
        lipsyncType: 'visemes' | 'blendshapes' | 'words'
        mood: Mood
    }

    interface SpeakAudioOptions {
        lipsyncLang?: string
    }

    interface SpeakTextOptions {
        lipsyncLang?: string
        avatarMood?: Mood
        ttsLang?: string
        ttsVoice?: string
        ttsRate?: number
        ttsPitch?: number
        ttsVolume?: number
    }


    interface StreamAudioOptions {
        audio: ArrayBuffer | Uint8Array | Uint16Array
        visemes?: any
        vtimes?: number[]
        vdurations?: number[]
        words?: string[]
        wtimes?: number[]
        wdurations?: number[]
        anims?: any[]
    }

    interface TalkingHeadOptions extends ViewOptions, LightOptions {
        jwtGet?: (() => string) | null
        ttsEndpoint?: string | null
        ttsApikey?: string | null
        ttsTrimStart?: number
        ttsTrimEnd?: number
        ttsLang?: string
        ttsVoice?: string
        ttsRate?: number
        ttsPitch?: number
        ttsVolume?: number
        mixerGainSpeech?: number | null;
        mixerGainBackground?: number | null;
        lipsyncModules?: string[] | null;
        lipsyncLang?: string | null;
        pcmSampleRate?: number
        modelRoot?: string
        modelPixelRatio?: number
        modelFPS?: number
        modelMovementFactor?: number
        dracoEnabled?: boolean
        dracoDecoderPath?: string
        cameraRotateX?: number
        cameraRotateY?: number
        cameraRotateEnable?: boolean
        cameraPanEnable?: boolean
        cameraZoomEnable?: boolean
        avatarMood?: Mood
        avatarMute?: boolean
        avatarIdleEyeContact?: number
        avatarIdleHeadMove?: number
        avatarSpeakingEyeContact?: number
        avatarSpeakingHeadMove?: number
        avatarIgnoreCamera?: boolean
        listeningSilenceThresholdLevel?: number
        listeningSilenceThresholdMs?: number
        listeningSilenceDurationMax?: number
        listeningActiveThresholdLevel?: number
        listeningActiveThresholdMs?: number
        listeningActiveDurationMax?: number
        statsNode?: HTMLElement | null
        statsStyle?: CSSStyleSheet | null
    }

    interface Avatar {
        url: string
        body?: 'M' | 'F'
        lipsyncLang?: string
        ttsLang?: string
        ttsVoice?: string
        ttsRate?: number
        ttsPitch?: number
        ttsVolume?: number
        avatarMood?: string
        avatarMute?: boolean
        avatarIdleEyeContact?: number
        avatarIdleHeadMove?: number
        avatarSpeakingEyeContact?: number
        avatarSpeakingHeadMove?: number
        modelDynamicBones?: object[]
    }

    type progressfn = (event: ProgressEvent) => any
    type subtitlesfn = (node: HTMLElement) => any

    interface Audio {
        audio: ArrayBuffer | ArrayBuffer[]
        words: string[]
        wtimes: number[]
        wdurations: number[]
        visemes?: string[]
        vtimes?: number[]
        vdurations?: number[]
        markers?: string[]
        mtimes?: number[]
    }

    interface Lipsync {
        visemes: string[]       // Oculus lip-sync visemes
        times: number[]         // Starting times in relative units
        durations: number[]     // Durations in relative units
    }

    type PoseObject = object;

    export class TalkingHead {
        constructor(node: HTMLElement, opt?: TalkingHeadOptions | null)

        initAudioGraph(sampleRate?: number | null): void

        valueFn(x: any): any

        deepCopy(x: object, editFn?: Function | null): object

        b64ToArrayBuffer(chunk: string): ArrayBuffer

        concatArrayBuffers(bufs: ArrayBuffer[]): ArrayBuffer

        pcmToAudioBuffer(buf: ArrayBuffer): AudioBuffer

        propsToThreeObjects(p: object): object

        clearThree(obj: object): void

        showAvatar(avatar: Avatar, onprogress?: progressfn | null): Promise<Avatar>

        getViewNames(): string[]

        getView(): string

        setView(view: string, opt?: ViewOptions | null): void

        setLighting(opt: LightOptions | null): void

        render(): void

        onResize(): void

        updatePoseBase(t: number): void

        updatePostDelta(): void

        updateMorphTargets(dt: number): void

        getPoseString(pose: PoseObject, prec?: number): void

        getPoseTemplateProp(key: string): Quaternion | Vector3

        mirrorPose(p: PoseObject): void

        poseFactory(template: PoseObject, ms?: number): PoseObject

        setPoseFromTemplate(template: PoseObject, ms?: number): void

        getValue(mt: string): number

        setValue(mt: string, val: number, ms?: number | null): void

        getMoodNames(): Mood[]

        getMood(): Mood

        setMood(mood: Mood): void

        getMorphTargetNames(): string[]

        getBaselineValue(mt: string): number

        setBaselineValue(mt: string, val: number): void

        getFixedValue(mt: string): number

        setFixedValue(mt: string, val: number, ms?: number | null): void

        animFactory(t: object, loop?: boolean, scaleTime?: number, scaleValue?: number, noClockOffset?: boolean): object

        valueAnimationSeq(vstart: number[], vend: number[], tstart: number[], tend: number[], t: number[], fun?: Function | null): number

        gaussianRandom(start: number, end: number, skew?: number, samples?: number): number

        sigmoidFactory(k: number): (t: number) => number

        convertRange(value: number, r1: number[], r2: number[]): number

        resetLips(): void

        lipsyncGetProcessor(lang: string, path?: string): void

        lipsyncPreProcessText(s: string, lang: string): string

        lipsyncWordsToVisemes(word: string, lang: string): Lipsync

        speakText(s: string, opt?: SpeakTextOptions | null, onsubtitles?: subtitlesfn | null, excludes?: number[][] | null): void

        speakEmoji(em: string): Promise<void>

        speakBreak(t: number): Promise<void>

        speakMarker(onmarker: () => any): Promise<void>

        playBackgroundAudio(url: string | null): Promise<void>

        stopBackgroundAudio(): void

        setReverb(url: string | null): Promise<void>

        setMixerGain(speech: number | null, background?: number | null, fadeSecs?: number): void

        speakAudio(r: Audio, opt?: SpeakAudioOptions | null, onsubtitles?: subtitlesfn | null): void

        playAudio(force?: boolean): Promise<void>

        startSpeaking(force?: boolean): Promise<void>

        pauseSpeaking(): void

        stopSpeaking(): void

        streamStart(opt?: StreamStartOptions, onAudioStart?: () => void, onAudioEnd?: () => void, onSubtitles?: subtitlesfn): Promise<void>

        streamNotifyEnd(): void

        streamStop(): void

        _processStreamLipsyncQueue(): void

        _processLipsyncData(r: object, audioStart: number): void

        streamAudio(r: StreamAudioOptions): void

        makeEyeContact(t: number): void

        lookAhead(t: number): void

        lookAtCamera(t: number): void

        lookAt(x: number, y: number, t: number): void

        touchAt(x: number, y: number): boolean

        speakWithHands(delay?: number, prob?: number): void

        getSlowdownRate(): number

        setSlowdownRate(k: number): void

        getAutoRotateSpeed(): number

        setAutoRotateSpeed(speed: number): void

        start(): void

        stop(): void

        startListening(analyzer: AnalyserNode, opt?: object, onchange?: () => void): void

        stopListening(): void

        playAnimation(url: string | object, onprogress?: progressfn, dur?: number, ndx?: number, scale?: number): Promise<void>

        stopAnimation(): void

        playPose(url: string | object, onprogress?: progressfn, dur?: number, ndx?: number, scale?: number): Promise<void>

        stopPose(): void

        playGesture(name: string, dur?: number, mirror?: boolean, ms?: number): void

        stopGesture(ms?: number): void

        ikSolve(ik: object, target?: Vector3 | null, relative?: boolean, d?: number): void
    }
}
