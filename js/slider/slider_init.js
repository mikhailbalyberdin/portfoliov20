import Creator from "./creator.js";
import {  buttonPaginationParams, paginationParams, sliderTrackParams, wrapperHiddenParams, leftArrowsParams, rightArrowsParams, } from "./slider-params.js";

class Slider  {
    #slider
    #slides
    #sliderTrack
    #wrapperHidden
    #slideCounter
    #slideWidth
    #paginationElement
    #timerId
    
    constructor(selector) {
        this.#slider = this.#buildSlider(selector)
        this.#slideCounter = 0
        this.#eventHandler()
        this.#slideWidth = this.#slider.offsetWidth
        this.xStart = 0
        this.xFinish = 0
        this.#periodicIncrement()
    }
    
    #buildSlider(selector) {
        const sliderTemplate = this.#getTemplate(selector)
        this.#sliderTrack = new Creator(sliderTrackParams).getElement()
        this.#wrapperHidden = new Creator(wrapperHiddenParams).getElement()
        this.#slides = sliderTemplate.querySelectorAll('.slider__slide')
        this.#sliderTrack.append(...sliderTemplate.children) 
        this.#wrapperHidden.append(this.#sliderTrack)
        // this.#slider.innerHTML = ""
        sliderTemplate.append(this.#wrapperHidden)
        this.#paginationElement = this.#buildPagination()
        const {leftArrow, rightArrow} = this.#buildArrows()
        sliderTemplate.append(this.#paginationElement, leftArrow, rightArrow)
        return sliderTemplate
    }

    #buildPagination() {
        const slideAmount = this.#slides.length
        const pagination = new Creator(paginationParams).getElement()
        for (let i = 0; i<slideAmount; i++) {
            const buttonPagination = new Creator(buttonPaginationParams).getElement();
            if (i===0) {
                buttonPagination.classList.add('active');
            }
            pagination.append(buttonPagination);
        }
        return pagination
    }

    #buildArrows() {
        const leftArrow = new Creator(leftArrowsParams).getElement()
        const rightArrow = new Creator(rightArrowsParams).getElement()
        const rightButtonCover = 
        `<svg xmlns="http://www.w3.org/2000/svg" class="arrow__svg" width="40" height="40" viewBox="0 0 24 24">
        <path class="arrow__path" d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886z"/>
        </svg>`
        const leftButtonCover = `<svg xmlns="http://www.w3.org/2000/svg" class="arrow__svg" width="40" height="40" viewBox="0 0 24 24">
        <path class = "arrow__path" d="m4.431 12.822l13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-1.569-.823l-13
        9a1.003 1.003 0 0 0 0 1.645z"/>
        </svg>`
        leftArrow.innerHTML = leftButtonCover
        rightArrow.innerHTML = rightButtonCover
        return {leftArrow, rightArrow}
    }

    #getTemplate(selector) {
        const template = document.body.querySelector(selector)
        if (template) return template
    }

    #paginationMove(currentPaginationButton) {
        const buttonsArr = Array.from(this.#paginationElement.querySelectorAll('[data-btn]'));
        this.#slideCounter = buttonsArr.indexOf(currentPaginationButton)
    }

    #sliderCounterDecrement() {
        if(this.#slideCounter <= 0) {
            this.#slideCounter = 1 
        }
        this.#slideCounter-=1
    }

    #sliderCounterIncrement() {
        if(this.#slideCounter >=2) {
            this.#slideCounter = -1
        }
        this.#slideCounter+=1
    }

    #sliderTranslation () {
        const gap = parseInt(window.getComputedStyle(this.#sliderTrack).gap)
        this.#sliderTrack.style.transform = `translateX(${-(this.#slideWidth+gap)*this.#slideCounter}px)`
    }

    #paginationStyle() {
        const buttonsList = this.#paginationElement.querySelectorAll('[data-btn]')
        this.#paginationElement.querySelector('.active').classList.remove('active')
        buttonsList[this.#slideCounter].classList.add('active')
    }

    #swipeHandler() {
        const minSwipe = 50
        const swipeDistance = Math.abs(this.xStart - this.xFinish)
        if(swipeDistance>=minSwipe) {
            if (this.xStart>this.xFinish) {
                this.#sliderCounterDecrement()
                this.#rerunAutoSlide()
            }
            else {
                this.#sliderCounterIncrement()
                this.#rerunAutoSlide()
            }
        }
    }

    #periodicIncrement() {
        this.#timerId = setInterval(()=>{this.#sliderCounterIncrement(), this.#paginationStyle(), this.#sliderTranslation()}, 5000)
    }

    #rerunAutoSlide() {
        clearInterval(this.#timerId)
        this.#timerId = setInterval(()=>{this.#sliderCounterIncrement(), this.#paginationStyle(), this.#sliderTranslation()}, 5000)
    }

    #eventHandler() {
        this.#slider.addEventListener('click', (event) => {
            const currentElement = event.target

            if (currentElement) {
                const isArrowRight = currentElement.closest('[data-arrow="right"]')
                const isArrowLeft = currentElement.closest('[data-arrow="left"]')
                const isPaginationButton = currentElement.closest('[data-btn]')

                if (isPaginationButton) {
                    this.#paginationMove(isPaginationButton)
                    this.#sliderTranslation()
                    // this.#paginationMove()
                    this.#paginationStyle()
                    this.#rerunAutoSlide()
                }

                if (isArrowLeft) {
                    this.#sliderCounterDecrement()
                    this.#sliderTranslation()
                    this.#paginationStyle()
                    this.#rerunAutoSlide()
                }

                if (isArrowRight) {
                    this.#sliderCounterIncrement()
                    this.#sliderTranslation()
                    this.#paginationStyle()
                    this.#rerunAutoSlide()
                }
                
            }
        }) 
        this.#slider.addEventListener('pointerdown', (event) => {
            this.xStart = parseInt(event.clientX)
        })

        this.#slider.addEventListener('pointerup', (event) => {
            this.xFinish = parseInt(event.clientX)
            this.#swipeHandler()
            this.#sliderTranslation()
            this.#paginationStyle()
            
        })

        this.#slider.addEventListener('touchstart', (event) => {
            this.xStart = parseInt(event.touches[0].clientX)
        })

        this.#slider.addEventListener('touchend', (event) => {
            this.xFinish = parseInt(event.changedTouches[0].clientX)
            this.#swipeHandler()
            this.#sliderTranslation()
            this.#paginationStyle()
        })
    }
}

export default Slider;
