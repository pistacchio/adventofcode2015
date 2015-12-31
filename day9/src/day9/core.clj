(require '[clojure.math.combinatorics :as combo])

(def partial-routes [
    ["Faerun" "Norrath" 129]
    ["Faerun" "Tristram" 58]
    ["Faerun" "AlphaCentauri" 13]
    ["Faerun" "Arbre" 24]
    ["Faerun" "Snowdin" 60]
    ["Faerun" "Tambi" 71]
    ["Faerun" "Straylight" 67]
    ["Norrath" "Tristram" 142]
    ["Norrath" "AlphaCentauri" 15]
    ["Norrath" "Arbre" 135]
    ["Norrath" "Snowdin" 75]
    ["Norrath" "Tambi" 82]
    ["Norrath" "Straylight" 54]
    ["Tristram" "AlphaCentauri" 118]
    ["Tristram" "Arbre" 122]
    ["Tristram" "Snowdin" 103]
    ["Tristram" "Tambi" 49]
    ["Tristram" "Straylight" 97]
    ["AlphaCentauri" "Arbre" 116]
    ["AlphaCentauri" "Snowdin" 12]
    ["AlphaCentauri" "Tambi" 18]
    ["AlphaCentauri" "Straylight" 91]
    ["Arbre" "Snowdin" 129]
    ["Arbre" "Tambi" 53]
    ["Arbre" "Straylight" 40]
    ["Snowdin" "Tambi" 15]
    ["Snowdin" "Straylight" 99]
    ["Tambi" "Straylight" 70]])

(def partial-routes [
    ["London" "Dublin" 464]
    ["London" "Belfast" 518]
    ["Dublin" "Belfast" 141]])

(def routes
    (concat partial-routes (map #(vector (second %) (first %) (nth % 2)) partial-routes)))

(defn
    departure-cities
    [routes]
    (map first routes))

(defn arrival-cities
    [routes]
    (map second routes))

(defn get-all-cities
    [routes]
    (set (concat (departure-cities routes) (arrival-cities routes))))

(def all-cities (get-all-cities routes))

(defn remove-departure
    [departure routes]
    (remove #(= (first %) departure) routes))

(defn remove-destination
    [destination routes]
    (remove #(= (second %) destination) routes))

(defn find-departures
    [departure routes]
    (filter #(= (first %) departure) routes))

(defn complete-route
    [route]
    (= (count route) (count all-cities)))

(defn build-routes
    [route routes done-routes]
    (let [last-route (last route)
          new-routes (remove-departure (first last-route) (remove-destination (second last-route) routes))
          departures (find-departures (second last-route) new-routes)
          next-destinations (map #(conj route %) departures)]
        (if (complete-route route)
            (conj done-routes route)
            ; (reset! done-routes (conj @done-routes (drop 1 route)))
            (mapcat #(build-routes % new-routes done-routes) next-destinations))))

(build-routes [(first routes)] routes [])

(defn route-length
    [route]
    (reduce + (map #(nth % 2) route)))

(defn shortest-routes
    [routes]
    (let [all-routes (remove empty? (map #(build-routes [%] routes) (first routes)))
          routes-with-length (map #(vector % (route-length %)) all-routes)
          sorted-routes (sort-by second routes-with-length)]
        (-> sorted-routes first second println)))

(build-routes [(first routes)] routes)
(shortest-routes routes)
