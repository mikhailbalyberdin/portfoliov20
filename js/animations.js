document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(SplitText)
    gsap.registerPlugin(ScrollTrigger)

    const tlHero = gsap.timeline();
    tlHero.fromTo("#heroTitle", {scale: 0,}, {scale: 1,})
    .fromTo("#heroSubtitle", { scale: 0}, {scale: 1,})
    .fromTo("#heroDescription", { scale: 0}, {scale: 1,})
    .fromTo(".avatar__image--top", {scale: 0}, {rotate: 1080, scale: 1, duration: 1});

    const split = new SplitText('#description', {type: 'chars', mask: "chars", charsClass: "chars",})
    gsap.from(split.chars,{
        opacity: 0,
        x: -40,
        stagger: 0.05,
        scrollTrigger:{
            trigger: '#about-me',
            start: 'top 80%',
            end:'bottom 81%',
            scrub: 2,
            toggleActions: 'play none none reverse',
            
        }
    })

    gsap.from('[data-card]', {
        y: 100,
        opacity: 0, 
        stagger: 0.1,
        scrollTrigger: {
            trigger: '#skills', 
            start: 'top 40%', 
            end: 'top 10%',
            scrub: 2,
        },
    })

    gsap.from('[data-project-card]', {
        y: 100,
        opacity: 0, 
        stagger: 0.1,
        scrollTrigger: {
            trigger: '#projects', 
            start: 'top 40%', 
            end: 'top 10%',
            scrub: 2,
        },
    })
    


});

