import { ref, onMounted } from 'vue';
import type { Address } from '@/interfaces/Address';
import type {} from '@types/google.maps';



export function useGoogleMaps(apiKey: string) {
  const isLoaded = ref(false);
  const isLoading = ref(false);

  const loadScript = () => {
    return new Promise<void>((resolve, reject) => {
      if (window.google?.maps?.importLibrary) {
        isLoaded.value = true;
        resolve();
        return;
      }

      // Dynamic Loader officiel de Google Maps
      ((g: any) => {
        var h: any, a: any, k: any, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window as any;
        b = b[c] || (b[c] = {});
        var d = b.maps || (b.maps = {}), r = new Set(), e = new URLSearchParams(), u = () => h || (h = new Promise(async (f, n) => {
          await (a = m.createElement("script"));
          e.set("libraries", [...r] + "");
          for (k in g) e.set(k.replace(/[A-Z]/g, (t: any) => "_" + t[0].toLowerCase()), g[k]);
          e.set("callback", c + ".maps." + q);
          a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
          d[q] = f;
          a.onerror = () => h = n(Error(p + " could not load."));
          a.nonce = m.querySelector("script[nonce]")?.nonce || "";
          m.head.append(a)
        }));
        d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f: any, ...n: any) => r.add(f) && u().then(() => d[l](f, ...n))
      })({
        key: apiKey,
        v: "weekly",
        language: "fr"
      });

      isLoaded.value = true;
      resolve();
    });
  };

  const parseAddressComponents = (place: google.maps.places.PlaceResult): Address | null => {
    if (!place.geometry?.location || !place.address_components) {
      return null;
    }

    const components: Record<string, string> = {};
    place.address_components.forEach((component) => {
      const type = component.types[0];
      components[type] = component.long_name;
    });

    return {
      formatted: place.formatted_address || '',
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      street_number: components.street_number,
      route: components.route,
      city: components.locality || components.administrative_area_level_2 || '',
      postalCode: components.postal_code || '',
      country: components.country || '',
    };
  };

  const initAutocomplete = async (
    container: HTMLElement,
    onPlaceChanged: (address: Address) => void
  ) => {
    if (!window.google?.maps) {
      console.error('Google Maps API not loaded');
      return null;
    }

    // Charge explicitement la librairie Places pour s'assurer que les Web Components sont enregistrés
    // C'est crucial pour que gmp-place-autocomplete soit reconnu
    await google.maps.importLibrary("places");

    console.log('Creating gmp-place-autocomplete element');
    
    // Utilise le nouveau PlaceAutocompleteElement (Web Component)
    const autocompleteElement = document.createElement('gmp-place-autocomplete') as any;
    autocompleteElement.setAttribute('type', 'address');
    autocompleteElement.setAttribute('country', 'fr');
    
    console.log('Autocomplete element created:', autocompleteElement);
    console.log('Is custom element defined?', customElements.get('gmp-place-autocomplete'));
    
    // Remplace le contenu du container
    container.innerHTML = '';
    container.appendChild(autocompleteElement);

    console.log('Adding gmp-placeselect listener');
    autocompleteElement.addEventListener('gmp-placeselect', async (event: any) => {
      try {
        const place = event.detail.place;
        console.log('Place selected, fetching fields...');
        
        // Utilise les nouveaux noms de champs de l'API Place
        await place.fetchFields({
          fields: ['location', 'formattedAddress', 'addressComponents']
        });
        
        console.log('Place fields fetched:', place);

        // Parsing manuel adapté à la nouvelle structure de l'objet Place
        const components: Record<string, string> = {};
        if (place.addressComponents) {
          place.addressComponents.forEach((component: any) => {
            const type = component.types[0];
            // Note: La nouvelle API utilise longText/shortText au lieu de long_name/short_name
            components[type] = component.longText || component.shortText || '';
          });
        }

        const address: Address = {
          formatted: place.formattedAddress || '',
          lat: place.location?.lat(),
          lng: place.location?.lng(),
          street_number: components.street_number || '',
          route: components.route || '',
          city: components.locality || components.administrative_area_level_2 || '',
          postalCode: components.postal_code || '',
          country: components.country || '',
        };

        console.log('Address parsed successfully:', address);
        onPlaceChanged(address);
      } catch (error) {
        console.error('Error handling place selection:', error);
      }
    });

    return autocompleteElement;
  };

  onMounted(() => {
    loadScript();
  });

  return {
    isLoaded,
    loadScript,
    initAutocomplete,
    parseAddressComponents,
  };
}
