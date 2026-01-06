import { ref, onMounted } from 'vue'
import type { Address } from '@/interfaces/Address'


let loaderPromise: Promise<void> | null = null

export function useGoogleMaps(apiKey: string) {
  const isLoaded = ref(false)
  const isLoading = ref(false)

  /* -------------------------------------------------------------------------- */
  /*                            Google Maps Loader                               */
  /* -------------------------------------------------------------------------- */

const loadScript = async (): Promise<void> => {
  if (isLoaded.value) return
  if (loaderPromise) return loaderPromise

  isLoading.value = true

  loaderPromise = new Promise<void>((resolve, reject) => {
    if (window.google?.maps) {
      isLoaded.value = true
      isLoading.value = false
      resolve()
      return
    }

    // Charger l'Extended Component Library (pour gmp-place-autocomplete)
    const extendedScript = document.createElement('script')
    extendedScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async&libraries=places,maps&callback=Function.prototype&v=weekly&language=fr`
    extendedScript.async = true
    extendedScript.defer = true

    extendedScript.onload = () => {
      isLoaded.value = true
      isLoading.value = false
      resolve()
    }

    extendedScript.onerror = () => {
      isLoading.value = false
      reject(new Error('Failed to load Google Maps API'))
    }

    document.head.appendChild(extendedScript)
  })

  return loaderPromise
}


  /* -------------------------------------------------------------------------- */
  /*                         Places Autocomplete (v2)                            */
  /* -------------------------------------------------------------------------- */

const initAutocomplete = async (
  container: HTMLElement,
  onPlaceChanged: (address: Address) => void,
  onError?: (message: string) => void
): Promise<HTMLElement> => {
  await loadScript()

  const autocomplete = document.createElement('gmp-place-autocomplete') as any

  autocomplete.setAttribute('type', 'address')
  autocomplete.setAttribute('country', 'fr')

  container.replaceChildren(autocomplete)

  autocomplete.addEventListener('gmp-placeselect', async (event: any) => {

    console.log('Place selected event:', event)

    try {
      const place = event.detail.place

      await place.fetchFields({
        fields: ['location', 'formattedAddress', 'addressComponents'],
      })

      // 🇫🇷 Validation France
      const countryCode = place.addressComponents
        ?.find((c: any) => c.types.includes('country'))
        ?.shortText?.toLowerCase()

      console.log('Selected country code:', countryCode)

      if (countryCode !== 'fr') {
        // ❌ reset input
        autocomplete.value = ''

        // 📢 message UX
        onError?.('Veuillez sélectionner une adresse située en France')

        return
      }

      // ✅ parsing
      const components: Record<string, string> = {}
      place.addressComponents?.forEach((c: any) => {
        components[c.types[0]] = c.longText || c.shortText || ''
      })

      onPlaceChanged({
        formatted: place.formattedAddress ?? '',
        lat: place.location?.lat(),
        lng: place.location?.lng(),
        street_number: components.street_number ?? '',
        route: components.route ?? '',
        city:
          components.locality ??
          components.administrative_area_level_2 ??
          '',
        postalCode: components.postal_code ?? '',
        country: components.country ?? '',
      })
    } catch (err) {
      onError?.('Une erreur est survenue lors de la sélection de l’adresse')
    }
  })

  return autocomplete
}

  /* -------------------------------------------------------------------------- */
  /*                    Places Autocomplete Service (Vuetify)                    */
  /* -------------------------------------------------------------------------- */

const searchPlaces = async (input: string): Promise<Array<{ title: string; placeId: string }>> => {
  await loadScript()
  
  if (!input || input.length < 3) return []

  try {
    const { AutocompleteSuggestion } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary
    
    const request = {
      input,
      includedRegionCodes: ['fr'],
      locationRestriction: undefined,
    }

    const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions(request)
    
    return suggestions
      .filter((suggestion) => suggestion.placePrediction)
      .map((suggestion) => {
        const prediction = suggestion.placePrediction!
        return {
          title: prediction.text.toString(),
          placeId: prediction.placeId // Utiliser placeId directement
        }
      })
  } catch (error) {
    console.error('Error fetching autocomplete suggestions:', error)
    return []
  }
}

const getPlaceDetails = async (placeId: string): Promise<Address> => {
  await loadScript()

  try {
    const { Place } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary

    // Utiliser le format de ressource "places/{placeId}" pour la nouvelle API
    // La propriété doit être "id" mais le placeId seul suffit
    const place = new Place({
      id: placeId,
    })

    await place.fetchFields({
      fields: ['addressComponents', 'formattedAddress', 'location'],
    })

    const components: Record<string, string> = {}
    place.addressComponents?.forEach((c) => {
      const type = c.types?.[0]
      if (type) {
        components[type] = c.longText || c.shortText || ''
      }
    })

    return {
      formatted: place.formattedAddress ?? '',
      lat: place.location?.lat() ?? 0,
      lng: place.location?.lng() ?? 0,
      street_number: components.street_number ?? '',
      route: components.route ?? '',
      city: components.locality ?? components.administrative_area_level_2 ?? '',
      postalCode: components.postal_code ?? '',
      country: components.country ?? '',
    }
  } catch (error) {
    throw new Error(`Place details failed: ${error}`)
  }
}

  /* -------------------------------------------------------------------------- */

  onMounted(loadScript)

  return {
    isLoaded,
    isLoading,
    loadScript,
    initAutocomplete,
    searchPlaces,
    getPlaceDetails,
  }
}
