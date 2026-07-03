import gsap from "gsap";

const DEFAULT_ENTRANCE_DURATION = 1.8;
const DEFAULT_ENTRANCE_STAGGER = 0.28;
const DEFAULT_FLOAT_DISTANCE = 12;

type PlayBubblesFromCenterOptions = {
   container: HTMLElement;
   elements: HTMLElement[];
   duration?: number;
   stagger?: number;
   initialScale?: number;
   ease?: string;
   targetScales?: number[];
   onComplete?: () => void;
};

type CreateBubbleFloatTweensOptions = {
   distance?: number;
   baseDuration?: number;
   durationStep?: number;
   delayStep?: number;
   rotation?: number;
};

type SetBubblesReducedMotionOptions = {
   targetScales?: number[];
};

const getTargetScale = (targetScales: number[] | undefined, index: number) => (
   targetScales?.[index] ?? 1
);

export function setBubblesReducedMotion(
   elements: HTMLElement[],
   { targetScales }: SetBubblesReducedMotionOptions = {}
) {
   gsap.set(elements, {
      autoAlpha: 1,
      opacity: 1,
      scale: (index: number) => getTargetScale(targetScales, index),
      x: 0,
      y: 0,
      rotation: 0,
   });
}

export function playBubblesFromCenter({
   container,
   elements,
   duration = DEFAULT_ENTRANCE_DURATION,
   stagger = DEFAULT_ENTRANCE_STAGGER,
   initialScale = 0.64,
   ease = "power3.out",
   targetScales,
   onComplete,
}: PlayBubblesFromCenterOptions) {
   gsap.set(elements, {
      opacity: 0,
      scale: (index: number) => getTargetScale(targetScales, index),
      x: 0,
      y: 0,
      rotation: 0,
   });

   const containerRect = container.getBoundingClientRect();
   const containerCenter = {
      x: containerRect.width / 2,
      y: containerRect.height / 2,
   };

   const startOffsets = elements.map((element) => {
      const rect = element.getBoundingClientRect();

      return {
         x: containerCenter.x - (rect.left - containerRect.left + rect.width / 2),
         y: containerCenter.y - (rect.top - containerRect.top + rect.height / 2),
      };
   });

   gsap.set(elements, {
      opacity: 0,
      scale: (index: number) => getTargetScale(targetScales, index) * initialScale,
      x: (index: number) => startOffsets[index]?.x ?? 0,
      y: (index: number) => startOffsets[index]?.y ?? 0,
      transformOrigin: "center center",
   });

   return gsap.to(elements, {
      opacity: 1,
      scale: (index: number) => getTargetScale(targetScales, index),
      x: 0,
      y: 0,
      duration,
      stagger,
      ease,
      overwrite: "auto",
      onComplete,
   });
}

export function createBubbleFloatTweens(
   elements: HTMLElement[],
   {
      distance = DEFAULT_FLOAT_DISTANCE,
      baseDuration = 3.6,
      durationStep = 0.25,
      delayStep = 0.12,
      rotation = 1.5,
   }: CreateBubbleFloatTweensOptions = {}
) {
   return elements.map((element, index) =>
      gsap.to(element, {
         y: index % 2 === 0 ? `-=${distance}` : `+=${distance}`,
         rotation: index % 2 === 0 ? rotation : -rotation,
         duration: baseDuration + index * durationStep,
         repeat: -1,
         yoyo: true,
         ease: "sine.inOut",
         delay: index * delayStep,
      })
   );
}
