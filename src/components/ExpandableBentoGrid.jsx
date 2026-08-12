'use client'

import React, { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useOutsideClick } from '../hooks/use-outside-click'
import { X } from 'lucide-react'

export default function ExpandableBentoGrid({ items }) {
    const [active, setActive] = useState(null)
    const ref = useRef(null)
    const id = useId()

    useEffect(() => {
        function onKeyDown(event) {
            if (event.key === 'Escape') {
                setActive(false)
            }
        }

        if (active && typeof active === 'object') {
            document.body.style.overflow = 'hidden'
            document.documentElement.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
            document.documentElement.style.overflow = ''
        }

        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [active])

    useOutsideClick(ref, () => setActive(null))

    return (
        <>
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {active && typeof active === 'object' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm h-full w-full z-[10000]"
                        />
                    )}
                </AnimatePresence>,
                document.body
            )}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                {active && typeof active === 'object' ? (
                    <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 sm:p-0 sm:top-16">
                        <motion.button
                            key={`button-${active.title}-${id}`}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.05 } }}
                            className="flex absolute top-4 right-4 sm:top-6 sm:right-6 lg:hidden items-center justify-center bg-[#30363D]/80 backdrop-blur-md rounded-full h-8 w-8 sm:h-10 sm:w-10 z-[10002]"
                            onClick={() => setActive(null)}
                        >
                            <X className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                        </motion.button>
                        <motion.div
                            layoutId={`card-${active.title}-${id}`}
                            ref={ref}
                            className="w-[90%] sm:w-full max-w-[460px] max-h-[85vh] sm:h-fit sm:max-h-[90%] flex flex-col bg-[#0d1117] border border-[#30363D] rounded-2xl sm:rounded-3xl overflow-y-auto overflow-x-hidden shadow-2xl relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                        >
                            <motion.div layoutId={`image-${active.title}-${id}`} className="flex-shrink-0">
                                <div className="w-full bg-[#0A84FF]/10 flex items-center justify-center perspective-distant transform-3d border-b border-[#30363D] relative overflow-hidden" style={{ aspectRatio: "1.294" }}>
                                    {active.pdfUrl ? (
                                        <iframe src={`${active.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`} scrolling="no" className="absolute inset-0 w-full h-full bg-white border-none overflow-hidden" title={active.title} />
                                    ) : active.icon ? (
                                        <div className="scale-[2.5] text-[#0A84FF]">{active.icon}</div>
                                    ) : (
                                        <div className="w-full h-full bg-[#30363D]" />
                                    )}
                                </div>
                            </motion.div>

                            <div className="flex flex-col flex-grow bg-[#0d1117]">
                                <div className="flex justify-between px-4 py-3 sm:px-6 sm:py-4 items-center border-b border-[#30363D]/50 flex-shrink-0">
                                    <div className="pr-3 sm:pr-4">
                                        <motion.h3
                                            layoutId={`title-${active.title}-${id}`}
                                            className="font-bold text-white text-lg sm:text-xl md:text-2xl"
                                        >
                                            {active.title}
                                        </motion.h3>
                                        <motion.p
                                            layoutId={`description-${active.title}-${id}`}
                                            className="text-[#8B949E] text-xs sm:text-sm md:text-base mt-1 sm:mt-2"
                                        >
                                            {active.description}
                                        </motion.p>
                                    </div>

                                    <motion.a
                                        layoutId={`button-${active.title}-${id}`}
                                        href={active.ctaLink || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm rounded-lg font-bold text-white bg-[#0A84FF] border border-transparent hover:bg-[#050709] hover:border-[#0A84FF] hover:shadow-[0_0_20px_rgba(10,132,255,0.4)] transition-all duration-300 whitespace-nowrap"
                                    >
                                        Visit
                                    </motion.a>
                                </div>
                                <div className="p-4 sm:p-6 flex flex-col items-start gap-4 mx-auto text-[#8B949E] text-sm md:text-base w-full">
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="w-full"
                                    >
                                        {active.content}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ) : null}
                </AnimatePresence>,
                document.body
            )}
            
            <ul className="max-w-7xl mx-auto w-full gap-3 sm:gap-6 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 items-stretch relative z-10">
                {items.map((item) => (
                    <motion.div
                        layoutId={`card-${item.title}-${id}`}
                        key={item.id}
                        onClick={() => setActive(item)}
                        className="p-3.5 md:p-6 flex flex-col justify-start md:justify-between items-start glass grad-border glass-hover rounded-xl cursor-pointer transition-colors h-full"
                    >
                        <div className="flex flex-col gap-3 md:gap-5 w-full h-full items-start text-left">
                            <motion.div layoutId={`image-${item.title}-${id}`} className="flex-shrink-0">
                                <div className="h-10 w-10 md:h-16 md:w-16 rounded-xl bg-[#0A84FF]/10 flex items-center justify-center text-[#0A84FF] border border-[#0A84FF]/20 shadow-[0_0_15px_rgba(10,132,255,0.1)] p-0.5">
                                    {item.icon}
                                </div>
                            </motion.div>
                            <div className="flex flex-col flex-grow w-full justify-start mt-1">
                                <motion.h3
                                    layoutId={`title-${item.title}-${id}`}
                                    className="font-bold text-white text-[12px] sm:text-[14px] md:text-lg leading-tight mb-1 line-clamp-2"
                                >
                                    {item.title}
                                </motion.h3>
                                <motion.p
                                    layoutId={`description-${item.title}-${id}`}
                                    className="text-[#8B949E] text-[10px] sm:text-[11px] md:text-sm font-medium line-clamp-1"
                                >
                                    {item.subtitle}
                                </motion.p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </ul>
        </>
    )
}
