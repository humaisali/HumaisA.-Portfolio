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
                    <div className="fixed inset-0 top-16 grid place-items-center z-[10001]">
                        <motion.button
                            key={`button-${active.title}-${id}`}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.05 } }}
                            className="flex absolute top-4 right-4 md:right-10 lg:hidden items-center justify-center bg-[#30363D] rounded-full h-10 w-10 z-[10002]"
                            onClick={() => setActive(null)}
                        >
                            <X className="h-6 w-6 text-white" />
                        </motion.button>
                        <motion.div
                            layoutId={`card-${active.title}-${id}`}
                            ref={ref}
                            className="w-full max-w-[530px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-[#0d1117] border border-[#30363D] sm:rounded-3xl overflow-hidden shadow-2xl"
                        >
                            <motion.div layoutId={`image-${active.title}-${id}`}>
                                <div className="w-full h-[300px] md:h-[400px] bg-[#0A84FF]/10 flex items-center justify-center perspective-distant transform-3d border-b border-[#30363D] relative overflow-hidden">
                                    {active.pdfUrl ? (
                                        <iframe src={`${active.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`} scrolling="no" className="absolute inset-0 w-full h-full bg-white border-none overflow-hidden" title={active.title} />
                                    ) : active.icon ? (
                                        <div className="scale-[2.5] text-[#0A84FF]">{active.icon}</div>
                                    ) : (
                                        <div className="w-full h-full bg-[#30363D]" />
                                    )}
                                </div>
                            </motion.div>

                            <div className="flex flex-col flex-grow bg-[#0d1117]">
                                <div className="flex justify-between p-6 items-center border-b border-[#30363D]/50">
                                    <div className="pr-4">
                                        <motion.h3
                                            layoutId={`title-${active.title}-${id}`}
                                            className="font-bold text-white text-xl md:text-2xl"
                                        >
                                            {active.title}
                                        </motion.h3>
                                        <motion.p
                                            layoutId={`description-${active.title}-${id}`}
                                            className="text-[#8B949E] text-sm md:text-base mt-2"
                                        >
                                            {active.description}
                                        </motion.p>
                                    </div>

                                    <motion.a
                                        layoutId={`button-${active.title}-${id}`}
                                        href={active.ctaLink || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-2.5 text-sm rounded-lg font-bold bg-[#0A84FF] hover:bg-[#00D4FF] transition-colors text-white whitespace-nowrap"
                                    >
                                        Visit
                                    </motion.a>
                                </div>
                                <div className="p-6 flex flex-col items-start gap-4 mx-auto overflow-hidden text-[#8B949E] text-sm md:text-base w-full">
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
            
            <ul className="max-w-7xl mx-auto w-full gap-4 sm:gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-stretch relative z-10">
                {items.map((item) => (
                    <motion.div
                        layoutId={`card-${item.title}-${id}`}
                        key={item.id}
                        onClick={() => setActive(item)}
                        className="p-6 flex flex-col justify-between items-start glass grad-border glass-hover rounded-xl cursor-pointer transition-colors h-full"
                    >
                        <div className="flex flex-col gap-5 w-full h-full">
                            <motion.div layoutId={`image-${item.title}-${id}`}>
                                <div className="h-16 w-16 rounded-xl bg-[#0A84FF]/10 flex items-center justify-center text-[#0A84FF] border border-[#0A84FF]/20 shadow-[0_0_15px_rgba(10,132,255,0.1)]">
                                    {item.icon}
                                </div>
                            </motion.div>
                            <div className="flex flex-col flex-grow">
                                <motion.h3
                                    layoutId={`title-${item.title}-${id}`}
                                    className="font-bold text-white text-lg leading-tight mb-2"
                                >
                                    {item.title}
                                </motion.h3>
                                <motion.p
                                    layoutId={`description-${item.title}-${id}`}
                                    className="text-[#8B949E] text-sm font-medium"
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
