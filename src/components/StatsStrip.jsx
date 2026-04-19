import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { stats } from "../data/index";

function Counter(props) {
  var target = props.target;
  var [count, setCount] = useState(0);

  useEffect(function() {
    var start = 0;
    var duration = 2000;
    var step = target / (duration / 16);
    var timer = setInterval(function() {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return function() { clearInterval(timer); };
  }, [target]);

  return <span>{count}</span>;
}

export default function StatsStrip() {
  return (
    <div className="relative z-10 border-y border-[#30363D]/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-[#30363D]/50">
          {stats.map(function(s, i) {
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center px-6"
              >
                <div className="text-4xl font-black gradient-text leading-none mb-1">
                  <Counter target={s.value} />{s.suffix}
                </div>
                <div className="text-[#8B949E] text-sm font-mono mt-1">{s.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
