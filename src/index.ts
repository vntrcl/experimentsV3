import axios from "axios";
import config from "./config";

interface UserExperiment {
  id?: string;
  hash: number;
  revision: number;
  bucket: number;
  override: number;
  population: number;
  hash_result?: number;
}

interface UserExperimentRolloutList {
  fingerprint: string;
  assignments: number[][];
}

interface UserExperimentRolloutResponse {
  data: UserExperimentRolloutList;
}

interface RolloutRegistrar {
  id: string;
  defaultConfig: object;
  rollout: object;
  hash: number;
  creationDate: number;
  type: string;
  title: string;
  description: string[];
  buckets: number[];
}

const rolloutRegistry: RolloutRegistrar[] = [
  {
    "id": "2023-01_global_display_names",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-01_global_display_names"
              ]
            }
          ]
        }
      ]
    },
    "hash": 785391472,
    "creationDate": 1673124185,
    "type": "user",
    "title": "Global Display Name",
    "description": [
      "Control",
      "Treatment 1: enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-03_split_permissions",
    "defaultConfig": {
      "isUsingV2Permission": false
    },
    "rollout": {
      "revision": 2,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 200,
                  "end": 10000
                }
              ]
            },
            {
              "treatment": "Treatment 1: Split permissions into Add/Modify + Delete",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 100
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: Split permissions into Add/Modify + Delete",
          "bucket": 1,
          "ids": [
            "651595875897835540",
            "1096485049760759972",
            "1100151397808357498",
            "827664081459740712",
            "993957185493160057",
            "705666251560583168",
            "1095740864757776488",
            "1103771563066658828",
            "1021478553033920544",
            "533420789547139077",
            "996817886695927808"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 2355118827,
    "creationDate": 1678221785,
    "type": "guild",
    "title": "Split Permissions",
    "description": [
      "Control",
      "Treatment 1: Split permissions into Add/Modify + Delete"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2021-09_favorites_server",
    "defaultConfig": {
      "favoritesEnabled": false,
      "canShow": true
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: It is on.",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2021-09_favorites_server"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1134868932,
    "creationDate": 1631047385,
    "type": "user",
    "title": "Enable fancy super-alpha favorites server.",
    "description": [
      "Control",
      "Treatment 1: It is on.",
      "Treatment 2: It is forced off"
    ],
    "buckets": [
      0,
      1,
      2
    ]
  },
  {
    "id": "2022-04_creator_monetization_country_allowlist",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enables users to view Creator Monetization entrypoints",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-04_creator_monetization_country_allowlist"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2532700533,
    "creationDate": 1649364185,
    "type": "user",
    "title": "Creator Monetization Available in Country",
    "description": [
      "Control",
      "Treatment 1: Enables users to view Creator Monetization entrypoints"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-09_creator_monetization_raven",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enables guild to create Guild Role Subscriptions quickly",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 1000
                },
                {
                  "start": 1000,
                  "end": 2000
                },
                {
                  "start": 2000,
                  "end": 3000
                },
                {
                  "start": 3000,
                  "end": 5000
                },
                {
                  "start": 5000,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: Enables guild to create Guild Role Subscriptions quickly",
          "bucket": 1,
          "ids": [
            "651595875897835540",
            "1045109153582022727",
            "1047953830979047455",
            "84764735832068096"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 3723449866,
    "creationDate": 1662583385,
    "type": "guild",
    "title": "Creator Monetization Onboarding v2",
    "description": [
      "Control",
      "Treatment 1: Enables guild to create Guild Role Subscriptions quickly"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-09_creator_monetization_raven_users",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enables users to create Guild Role Subscriptions quickly",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-09_creator_monetization_raven_users"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2539540256,
    "creationDate": 1662583385,
    "type": "user",
    "title": "Creator Monetization Onboarding v2 Users",
    "description": [
      "Control",
      "Treatment 1: Enables users to create Guild Role Subscriptions quickly"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-11_creator_monetization_onboarding_waitlist",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enables Guilds to (possibly) see the waitlist",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "range_by_hash",
              "range": 10000
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enables Guilds to (possibly) see the waitlist",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "INTERNAL_EMPLOYEE_ONLY"
              ]
            }
          ]
        }
      ]
    },
    "hash": 987884927,
    "creationDate": 1667853785,
    "type": "guild",
    "title": "Creator Monetization Onboarding Waitlist",
    "description": [
      "Control",
      "Treatment 1: Enables Guilds to (possibly) see the waitlist"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-01_creator_monetization_nag_activate_users",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enables users to see nag bar to activate server subscriptions",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-01_creator_monetization_nag_activate_users"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3029387945,
    "creationDate": 1673124185,
    "type": "user",
    "title": "Creator Monetization Nag Activate Users",
    "description": [
      "Control",
      "Treatment 1: Enables users to see nag bar to activate server subscriptions"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-03_cr_accept_new_terms",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": []
    },
    "hash": 747043176,
    "creationDate": 1678221785,
    "type": "guild",
    "title": "Server Subscriptions Accept New Terms",
    "description": [
      "Control",
      "Treatment 1: Enables Server Subscriptions Accept New Terms"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2021-06_guild_role_subscriptions",
    "defaultConfig": {
      "enableRoleSubscriptionsForGuild": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 7200,
                  "end": 10000
                }
              ]
            },
            {
              "treatment": "Treatment 1: Enables guild to create Guild Role Subscriptions",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 4750
                },
                {
                  "start": 4750,
                  "end": 5200
                },
                {
                  "start": 5200,
                  "end": 5700
                },
                {
                  "start": 5700,
                  "end": 6200
                },
                {
                  "start": 6200,
                  "end": 7200
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "range_by_hash",
              "range": 10000
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enables guild to create Guild Role Subscriptions",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "GUILD_ROLE_SUBSCRIPTIONS"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1405831955,
    "creationDate": 1623098585,
    "type": "guild",
    "title": "Guild Role Subscriptions",
    "description": [
      "Control",
      "Treatment 1: Enables guild to create Guild Role Subscriptions"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2021-08_guild_role_subscription_users",
    "defaultConfig": {
      "enableRoleSubscriptionsForUser": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enables users to create Guild Role Subscriptions",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2021-08_guild_role_subscription_users"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1567199723,
    "creationDate": 1628368985,
    "type": "user",
    "title": "Guild Role Subscription Users",
    "description": [
      "Control",
      "Treatment 1: Enables users to create Guild Role Subscriptions"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-01_guild_role_subscription_multigroup",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: Enables guild to create multiple Guild Role Subscription groups",
          "bucket": 1,
          "ids": [
            "908114392263049277",
            "852602631297171507",
            "966419039977111582",
            "839303183536750622"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 2201448248,
    "creationDate": 1641588185,
    "type": "guild",
    "title": "Guild Role Subscription Multigroup",
    "description": [
      "Control",
      "Treatment 1: Enables guild to create multiple Guild Role Subscription groups"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-01_guild_role_subscription_trials",
    "defaultConfig": {
      "enableRoleSubscriptionTrialsForGuild": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enables guild to create Guild Role Subscription Trials",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "range_by_hash",
              "range": 10000
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enables guild to create Guild Role Subscription Trials",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "GUILD_ROLE_SUBSCRIPTION_TRIALS"
              ]
            }
          ]
        }
      ]
    },
    "hash": 4200595067,
    "creationDate": 1641588185,
    "type": "guild",
    "title": "Guild Role Subscription Trials",
    "description": [
      "Control",
      "Treatment 1: Enables guild to create Guild Role Subscription Trials"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-03_role_subscription_analytics_portal",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enables guild to view analytics for role subscriptions",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: Enables guild to view analytics for role subscriptions",
          "bucket": 1,
          "ids": [
            "908114392263049277",
            "786729496572985354",
            "694472115428261888",
            "488444879836413975",
            "271486833223794694",
            "262030232683413504",
            "852602631297171507",
            "346465284477026309",
            "825852143478636554",
            "736744916012630046",
            "930534056200929290",
            "976593171834351728"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 3510816342,
    "creationDate": 1646685785,
    "type": "guild",
    "title": "Guild Role Subscription Analytics",
    "description": [
      "Control",
      "Treatment 1: Enables guild to view analytics for role subscriptions"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-04_guild_role_subscription_purchase_feedback_loop",
    "defaultConfig": {
      "enableRoleSubscriptionPurchaseFeedbackLoop": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enables guilds to send purchsae feedback loop system messages",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: Enables guilds to send purchsae feedback loop system messages",
          "bucket": 1,
          "ids": [
            "908114392263049277"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 1990672009,
    "creationDate": 1649364185,
    "type": "guild",
    "title": "Guild Role Subscription Purchase Feedback Loop",
    "description": [
      "Control",
      "Treatment 1: Enables guilds to send purchsae feedback loop system messages"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-05_mobile_web_role_subscription_purchase_page",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enables role subscription mobile web purchase page",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": []
    },
    "hash": 4190408036,
    "creationDate": 1651956185,
    "type": "guild",
    "title": "Guild Role Subscription Mobile Web",
    "description": [
      "Control",
      "Treatment 1: Enables role subscription mobile web purchase page"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-06_native_mobile_role_subscription_management",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable native role subscription management for mobile",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-06_native_mobile_role_subscription_management"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1034661306,
    "creationDate": 1654634585,
    "type": "user",
    "title": "Mobile Guild Role Subscription Management",
    "description": [
      "Control",
      "Treatment 1: Enable native role subscription management for mobile"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-07_guild_role_subscriptions_variable_max_tiers",
    "defaultConfig": {
      "enabled": false,
      "maxTiers": 3
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 6: Enables {n} maximum published tiers",
          "bucket": 6,
          "ids": [
            "908114392263049277",
            "443584877829554177",
            "223070469148901376",
            "224565836277481473",
            "488444879836413975",
            "756644176610721842"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 179711638,
    "creationDate": 1657226585,
    "type": "guild",
    "title": "Guild Role Subscription Max Tiers",
    "description": [
      "Control",
      "Treatment 4: Enables {n} maximum published tiers",
      "Treatment 5: Enables {n} maximum published tiers",
      "Treatment 6: Enables {n} maximum published tiers"
    ],
    "buckets": [
      0,
      4,
      5,
      6
    ]
  },
  {
    "id": "2022-08_mobile_web_role_subscription_upsell",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable mobile web role subscription upsell",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-08_mobile_web_role_subscription_upsell"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2514746297,
    "creationDate": 1659904985,
    "type": "user",
    "title": "Mobile Web Guild Role Subscription Upsell",
    "description": [
      "Control",
      "Treatment 1: Enable mobile web role subscription upsell"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-10_creator_store_pages",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enables guild to have store page",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: Enables guild to have store page",
          "bucket": 1,
          "ids": [
            "979437427456364574",
            "958135532590874704",
            "893264120722370570",
            "1042148168726487101",
            "1042185536984592577",
            "1042521715630166056",
            "488444879836413975",
            "424012709219008522",
            "223070469148901376",
            "359039577362530314",
            "703067018416619522",
            "736744916012630046",
            "930534056200929290",
            "349309639181074433",
            "356833056562348042",
            "378662079361449994",
            "697694775561945109",
            "742765599738036275",
            "936663832070340678",
            "816393875027394642"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 24149521,
    "creationDate": 1665175385,
    "type": "guild",
    "title": "Creator Store Pages ",
    "description": [
      "Control",
      "Treatment 1: Enables guild to have store page"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-12_mobile_guild_role_subscription_team_setup",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 1000,
                  "end": 10000
                }
              ]
            },
            {
              "treatment": "Treatment 1: Enables guild to allow payout team setup on mobile",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 1000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: Enables guild to allow payout team setup on mobile",
          "bucket": 1,
          "ids": [
            "651595875897835540",
            "1049812122701410314"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 3313601281,
    "creationDate": 1670445785,
    "type": "guild",
    "title": "Mobile Guild Role Subscription Team Setup",
    "description": [
      "Control",
      "Treatment 1: Enables guild to allow payout team setup on mobile"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-02_server_subscriptions_iap",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        },
        {
          "position": [
            {
              "treatment": "Treatment 1: Enables Server Subscriptions IAP",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": []
    },
    "hash": 295820329,
    "creationDate": 1675802585,
    "type": "guild",
    "title": "Server Subscriptions IAP",
    "description": [
      "Control",
      "Treatment 1: Enables Server Subscriptions IAP"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-03_server_subs_iap_geo_rollout",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enables Server Subscriptions IAP For User",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-03_server_subs_iap_geo_rollout"
              ]
            }
          ]
        }
      ]
    },
    "hash": 6046655,
    "creationDate": 1678221785,
    "type": "user",
    "title": "Server Subscriptions IAP User",
    "description": [
      "Control",
      "Treatment 1: Enables Server Subscriptions IAP For User"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-03_server_subscriptions_tier_templates",
    "defaultConfig": {
      "enabled": false,
      "showCreatorPortalLink": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 3: 399 basic tier + link",
              "bucket": 3,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "GUILD_ROLE_SUBSCRIPTION_TIER_TEMPLATE"
              ]
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 2000,
                  "end": 10000
                }
              ]
            },
            {
              "treatment": "Treatment 1: 299 basic tier + no link",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 500,
                  "end": 1000
                }
              ]
            },
            {
              "treatment": "Treatment 2: 399 basic tier + no link",
              "bucket": 2,
              "rollouts": [
                {
                  "start": 1000,
                  "end": 1500
                }
              ]
            },
            {
              "treatment": "Treatment 3: 399 basic tier + link",
              "bucket": 3,
              "rollouts": [
                {
                  "start": 1500,
                  "end": 2000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "ROLE_SUBSCRIPTIONS_ENABLED"
              ]
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: 299 basic tier + no link",
          "bucket": 1,
          "ids": [
            "1042148168726487101",
            "1042521715630166056",
            "954473884273496124",
            "893264120722370570",
            "1098703291694710836",
            "963913819418161182",
            "954477686967922778",
            "1063878083322585088",
            "706356477765353563"
          ]
        },
        {
          "treatment": "Treatment 3: 399 basic tier + link",
          "bucket": 3,
          "ids": [
            "949396043743789116",
            "1053361203738591262",
            "1103781094203072632",
            "494673764601036840",
            "458369608655831050",
            "217055651371679745",
            "752560653939638334",
            "577158348068093982",
            "585190878151311373",
            "986205117357363240",
            "334891772696330241",
            "719579184023863378",
            "212435931766980609",
            "725341600670023700"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 808859253,
    "creationDate": 1678221785,
    "type": "guild",
    "title": "Server Subscriptions Tier Templates",
    "description": [
      "Control",
      "Treatment 1: 299 basic tier + no link",
      "Treatment 2: 399 basic tier + no link",
      "Treatment 3: 399 basic tier + link"
    ],
    "buckets": [
      0,
      1,
      2,
      3
    ]
  },
  {
    "id": "2023-04_server_subscriptions_tier_templates_user",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable tier templates for user",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-04_server_subscriptions_tier_templates_user"
              ]
            }
          ]
        }
      ]
    },
    "hash": 4265918989,
    "creationDate": 1680900185,
    "type": "user",
    "title": "Server Subscriptions Tier Templates",
    "description": [
      "Control",
      "Treatment 1: Enable tier templates for user"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-03_self_demonetization",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enables Self Demonetization",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: Enables Self Demonetization",
          "bucket": 1,
          "ids": [
            "1042521715630166056"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 3194028601,
    "creationDate": 1678221785,
    "type": "guild",
    "title": "Self Demonetization",
    "description": [
      "Control",
      "Treatment 1: Enables Self Demonetization"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-04_broadcasting",
    "defaultConfig": {
      "canBroadcast": false,
      "canViewBroadcasts": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Allow user to Broadcast to friends & guilds",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-04_broadcasting"
              ]
            }
          ]
        }
      ]
    },
    "hash": 139947315,
    "creationDate": 1680900185,
    "type": "user",
    "title": "Go Live Broadcasting",
    "description": [
      "Control",
      "Treatment 1: Allow user to Broadcast to friends & guilds",
      "Treatment 2: Cannot broadcast, cannot view broadcasts"
    ],
    "buckets": [
      0,
      1,
      2
    ]
  },
  {
    "id": "2023-02_onboarding_home_admin",
    "defaultConfig": {
      "homeSettingsEnabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Show the Onboarding Version of Home in Admin Settings",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 5000,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "range_by_hash",
              "range": 10000
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Show the Onboarding Version of Home in Admin Settings",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "id",
              "ids": [
                "321410260176732160",
                "884458417467559936",
                "384811165949231104",
                "464894153193684993",
                "524552788932558848",
                "148606162810568704",
                "603970300668805120",
                "310162323220201475",
                "522477306787397642",
                "187450744427773963",
                "422460360084291596",
                "808241932919767050",
                "786557653924708373",
                "1075932456198352918",
                "1079876496493121558",
                "1011482947343372319",
                "1080899969243943072",
                "679875946597056683",
                "692412843370348615",
                "1075056311651270736",
                "942897714956472401",
                "828370043867496531"
              ]
            }
          ]
        }
      ]
    },
    "hash": 748249793,
    "creationDate": 1675802585,
    "type": "guild",
    "title": "[ADMIN] Home as a community onboarding surface",
    "description": [
      "Control",
      "Treatment 1: Show the Onboarding Version of Home in Admin Settings"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-05_optional_onboarding_home_admin",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Optional",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-05_optional_onboarding_home_admin"
              ]
            }
          ]
        }
      ]
    },
    "hash": 695300504,
    "creationDate": 1683492185,
    "type": "guild",
    "title": "[ADMIN] Make server guide optional",
    "description": [
      "Control",
      "Treatment 1: Optional"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-02_onboarding_home",
    "defaultConfig": {
      "showOnboardingHome": false,
      "enableDevItems": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Show the Onboarding Version of Home",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-02_onboarding_home"
              ]
            }
          ]
        }
      ]
    },
    "hash": 454680912,
    "creationDate": 1675802585,
    "type": "user",
    "title": "Home as a community onboarding surface",
    "description": [
      "Control",
      "Treatment 1: Show the Onboarding Version of Home",
      "Treatment 2: Onboarding Home DEV",
      "Treatment 3: Show the Onboarding Version of Home"
    ],
    "buckets": [
      0,
      1,
      2,
      3
    ]
  },
  {
    "id": "2023-06_mobile_redesign_curry_existing_users",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Combine Messages and Guilds",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-06_mobile_redesign_curry_existing_users"
              ]
            }
          ]
        }
      ]
    },
    "hash": 4015496517,
    "creationDate": 1686170585,
    "type": "user",
    "title": "Tabs V2 - Curry Existing Users",
    "description": [
      "Control",
      "Treatment 1: Combine Messages and Guilds",
      "Treatment 2: App Navbar Always Visible",
      "Treatment 3: App Navbar Always Visible + Keep Channel",
      "Treatment 4: Recent channels",
      "Treatment 5: Launch into last channel",
      "Treatment 6: Plain Redesign"
    ],
    "buckets": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "2023-06_mobile_redesign_curry_new_users",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Combine Messages and Guilds",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-06_mobile_redesign_curry_new_users"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2373630185,
    "creationDate": 1686170585,
    "type": "user",
    "title": "Tabs V2 - Curry New Users",
    "description": [
      "Control",
      "Treatment 1: Combine Messages and Guilds",
      "Treatment 2: App Navbar Always Visible",
      "Treatment 3: App Navbar Always Visible + Keep Channel",
      "Treatment 4: Recent channels",
      "Treatment 5: Launch into last channel",
      "Treatment 6: Plain Redesign"
    ],
    "buckets": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "2023-02_tabs_v2",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable Tabs V2",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-02_tabs_v2"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1499660140,
    "creationDate": 1675802585,
    "type": "user",
    "title": "Tabs V2 - GDM Bucketing",
    "description": [
      "Control",
      "Treatment 1: Enable Tabs V2"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-03_mobile_re_design_existing_users",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable Tabs V2",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-03_mobile_re_design_existing_users"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1929843098,
    "creationDate": 1678221785,
    "type": "user",
    "title": "Tabs V2 - Existing Users",
    "description": [
      "Control",
      "Treatment 1: Enable Tabs V2"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-02_mobile_redesign_new_users",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable Tabs V2",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-02_mobile_redesign_new_users"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1084726125,
    "creationDate": 1675802585,
    "type": "user",
    "title": "Tabs V2 - New Users",
    "description": [
      "Control",
      "Treatment 1: Enable Tabs V2"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-04_mobile_redesign_0c_new_users",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable Tabs V2",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-04_mobile_redesign_0c_new_users"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1767248084,
    "creationDate": 1680900185,
    "type": "user",
    "title": "Tabs V2 - New Users Phase 0c",
    "description": [
      "Control",
      "Treatment 1: Enable Tabs V2"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-04_mobile_redesign_0d_new_users",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable Tabs V2",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-04_mobile_redesign_0d_new_users"
              ]
            }
          ]
        }
      ]
    },
    "hash": 4264103376,
    "creationDate": 1680900185,
    "type": "user",
    "title": "Tabs V2 - New Users Phase 0d",
    "description": [
      "Control",
      "Treatment 1: Enable Tabs V2"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-08_rtc_minimum_jitter_buffer_level",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Minimum Jitter Buffer Level = 40ms",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-08_rtc_minimum_jitter_buffer_level"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1077571921,
    "creationDate": 1659904985,
    "type": "user",
    "title": "Minimum Jitter Buffer Level",
    "description": [
      "Control",
      "Treatment 1: Minimum Jitter Buffer Level = 40ms",
      "Treatment 2: Minimum Jitter Buffer Level = 60ms",
      "Treatment 3: Minimum Jitter Buffer Level = 80ms"
    ],
    "buckets": [
      0,
      1,
      2,
      3
    ]
  },
  {
    "id": "2021-10_price_determination",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2021-10_price_determination"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3997593347,
    "creationDate": 1633639385,
    "type": "user",
    "title": "Price determination experiment",
    "description": [
      "Control",
      "Treatment 1: Enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-05_overlay_hook_crash_detection",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: EnableCrashReporting",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-05_overlay_hook_crash_detection"
              ]
            }
          ]
        }
      ]
    },
    "hash": 933369006,
    "creationDate": 1683492185,
    "type": "user",
    "title": "Detect and report crashes in the overlay hook",
    "description": [
      "Control",
      "Treatment 1: EnableCrashReporting",
      "Treatment 2: EnableCrashTrigger"
    ],
    "buckets": [
      0,
      1,
      2
    ]
  },
  {
    "id": "2022-11_rtx40xx_gpu_screenshare_with_av1",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Screenshare with AV1",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-11_rtx40xx_gpu_screenshare_with_av1"
              ]
            }
          ]
        }
      ]
    },
    "hash": 535388300,
    "creationDate": 1667853785,
    "type": "user",
    "title": "Test how AV1 works on windows with RTX40xx GPUs for screenshare",
    "description": [
      "Control",
      "Treatment 1: Screenshare with AV1"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-02_h265_android",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Calling with H.265",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-02_h265_android"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2838233237,
    "creationDate": 1675802585,
    "type": "user",
    "title": "Test how h265 works on android for DM calls",
    "description": [
      "Control",
      "Treatment 1: Calling with H.265"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-10_h265_dm_call",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Calling with H.265",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-10_h265_dm_call"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3916079111,
    "creationDate": 1665175385,
    "type": "user",
    "title": "Test how h265 works on ios/macos for DM calls",
    "description": [
      "Control",
      "Treatment 1: Calling with H.265"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2021-06_hdr_screen_capture",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Always",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2021-06_hdr_screen_capture"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2912909916,
    "creationDate": 1623098585,
    "type": "user",
    "title": "HDR Screen Capture",
    "description": [
      "Control",
      "Treatment 1: Always",
      "Treatment 2: Permitted Devices Only"
    ],
    "buckets": [
      0,
      1,
      2
    ]
  },
  {
    "id": "2021-08_max_sync_delay",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Use 3 seconds as max sync delay",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2021-08_max_sync_delay"
              ]
            }
          ]
        }
      ]
    },
    "hash": 578035700,
    "creationDate": 1628368985,
    "type": "user",
    "title": "Overrides the default max sync delay for AV streams in WebRTC",
    "description": [
      "Control",
      "Treatment 1: Use 3 seconds as max sync delay"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2021-02_quartz_video_source",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: gotta go fast",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2021-02_quartz_video_source"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3316720711,
    "creationDate": 1612730585,
    "type": "user",
    "title": "Quartz Video Source",
    "description": [
      "Control",
      "Treatment 1: gotta go fast",
      "Treatment 2: 2fast 2furious"
    ],
    "buckets": [
      0,
      1,
      2
    ]
  },
  {
    "id": "2021-03_videotoolbox_rate_optimization",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: On",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2021-03_videotoolbox_rate_optimization"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2775082884,
    "creationDate": 1615149785,
    "type": "user",
    "title": "VideoToolbox Rate Control Optimizations",
    "description": [
      "Control",
      "Treatment 1: On"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-12_auto_disable_video_mobile_v1",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: 5 second window, 100% allowed poor fps ratio, 5 fps threshold, 5 second backoff",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-12_auto_disable_video_mobile_v1"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3888328973,
    "creationDate": 1670445785,
    "type": "user",
    "title": "Mobile performance: VideoHealthManager",
    "description": [
      "Control",
      "Treatment 1: 5 second window, 100% allowed poor fps ratio, 5 fps threshold, 5 second backoff",
      "Treatment 2: 5 second window, 100% allowed poor fps ratio, 5 fps threshold, 10 second backoff",
      "Treatment 3: 10 second window, 70% allowed poor fps ratio, 5 fps threshold, 15 second backoff",
      "Treatment 4: 10 second window, 90% allowed poor fps ratio, 5 fps threshold, 15 second backoff"
    ],
    "buckets": [
      0,
      1,
      2,
      3,
      4
    ]
  },
  {
    "id": "2023-04_day_0_nux",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-04_day_0_nux"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3498213737,
    "creationDate": 1680900185,
    "type": "user",
    "title": "Mobile Redesign Day 0 NUX",
    "description": [
      "Control",
      "Treatment 1: Enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-09_remote_audio_settings",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Read/write remote audio settings",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-09_remote_audio_settings"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1503364285,
    "creationDate": 1662583385,
    "type": "user",
    "title": "Remote Audio Settings",
    "description": [
      "Control",
      "Treatment 1: Read/write remote audio settings"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-1_read_state_staff",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Refresh after enabling",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-1_read_state_staff"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2864217513,
    "creationDate": 0,
    "type": "user",
    "title": "Read State Staff",
    "description": [
      "Control",
      "Treatment 1: Refresh after enabling"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-03_client_themes_16thru21",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: New themes enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-03_client_themes_16thru21"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1212874525,
    "creationDate": 1678221785,
    "type": "user",
    "title": "Client Themes New Themes",
    "description": [
      "Control",
      "Treatment 1: New themes enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-07_file_upload_limit",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-07_file_upload_limit"
              ]
            }
          ]
        }
      ]
    },
    "hash": 828251710,
    "creationDate": 1657226585,
    "type": "user",
    "title": "File Upload Limit Increase",
    "description": [
      "Control",
      "Treatment 1: Enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-09_free_file_upload_limit",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-09_free_file_upload_limit"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3991298449,
    "creationDate": 1662583385,
    "type": "user",
    "title": "Free File Upload Limit Increase",
    "description": [
      "Control",
      "Treatment 1: Enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-02_burst_reaction_guild_experiment",
    "defaultConfig": {
      "enabled": false,
      "hasTabUI": false,
      "hasInfinite": false,
      "hasFreeBursts": false
    },
    "rollout": {
      "revision": 3,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 4: Free Bursts",
              "bucket": 4,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "INTERNAL_EMPLOYEE_ONLY"
              ]
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 2000,
                  "end": 10000
                }
              ]
            },
            {
              "treatment": "Treatment 1: Enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 100
                },
                {
                  "start": 200,
                  "end": 600
                }
              ]
            },
            {
              "treatment": "Treatment 4: Free Bursts",
              "bucket": 4,
              "rollouts": [
                {
                  "start": 100,
                  "end": 200
                },
                {
                  "start": 600,
                  "end": 1000
                },
                {
                  "start": 1000,
                  "end": 1500
                },
                {
                  "start": 1500,
                  "end": 2000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 4: Free Bursts",
          "bucket": 4,
          "ids": [
            "886812261455368233",
            "315263844207558671",
            "268982240569065472",
            "1007668375159320607",
            "943265993613008967",
            "992539246835535943",
            "1008822885378433105",
            "1001114660524806205",
            "1037856262144135230",
            "642500834516664331",
            "900193715962912819",
            "533420789547139077",
            "928454829079138344",
            "169256939211980800",
            "348185509484298240",
            "132251458665054209",
            "942897714956472401",
            "917594655414181898",
            "775023113645064253",
            "1009606240546066473",
            "81384788765712384",
            "1073747669937299567",
            "401220874742661121"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 2014775304,
    "creationDate": 1675802585,
    "type": "guild",
    "title": "Burst Reactions",
    "description": [
      "Control",
      "Treatment 1: Enabled",
      "Treatment 2: Tab UI",
      "Treatment 4: Free Bursts"
    ],
    "buckets": [
      0,
      1,
      2,
      4
    ]
  },
  {
    "id": "2022-09_burst_reactions",
    "defaultConfig": {
      "enabled": false,
      "hasTabUI": false,
      "hasTwoButtonEntryPoint": false,
      "hasFreeBursts": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: User two entry points",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-09_burst_reactions"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1443856828,
    "creationDate": 1662583385,
    "type": "user",
    "title": "Burst Reactions User Experiment",
    "description": [
      "Control",
      "Treatment 1: User two entry points",
      "Treatment 2: User Tab UI",
      "Treatment 4: User Free Bursts",
      "Treatment 5: User Free Bursts",
      "Treatment 6: Combined entry point and tabs",
      "Treatment 7: Combined entry point and tabs + double weekly refills",
      "Treatment 8: All additional polish",
      "Treatment 9: All additional polish except notifications",
      "Treatment 10: The exact same as bucket six, just with a different label"
    ],
    "buckets": [
      0,
      1,
      2,
      4,
      5,
      6,
      7,
      8,
      9,
      10
    ]
  },
  {
    "id": "2023-03_mobile_burst_reactions",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-03_mobile_burst_reactions"
              ]
            }
          ]
        }
      ]
    },
    "hash": 412458642,
    "creationDate": 1678221785,
    "type": "user",
    "title": "Mobile Burst Reactions User Experiment",
    "description": [
      "Control",
      "Treatment 1: Enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-04_activity_launcher_embed",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable the Activity Launcher Embed in chat",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-04_activity_launcher_embed"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3699020455,
    "creationDate": 1680900185,
    "type": "user",
    "title": "Activity Launcher Embed",
    "description": [
      "Control",
      "Treatment 1: Enable the Activity Launcher Embed in chat"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-10_context_menu_and_new_media_picker",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: New media picker is enabled. Gift button is visible alongside Create Chread",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-10_context_menu_and_new_media_picker"
              ]
            }
          ]
        }
      ]
    },
    "hash": 478936943,
    "creationDate": 1665175385,
    "type": "user",
    "title": "Context Menu and New Media Picker",
    "description": [
      "Control",
      "Treatment 1: New media picker is enabled. Gift button is visible alongside Create Chread",
      "Treatment 2: New media picker is enabled. Gift button is NOT visible alongside Create Chread"
    ],
    "buckets": [
      0,
      1,
      2
    ]
  },
  {
    "id": "2023-03_store_latest_message_data",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Use latest data from api/gateway",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-03_store_latest_message_data"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1617749743,
    "creationDate": 1678221785,
    "type": "user",
    "title": "Store latest message data",
    "description": [
      "Control",
      "Treatment 1: Use latest data from api/gateway"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-12_media_mosaic_experiment",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Media mosaic is enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-12_media_mosaic_experiment"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1133868976,
    "creationDate": 1670445785,
    "type": "user",
    "title": "Media Mosaic",
    "description": [
      "Control",
      "Treatment 1: Media mosaic is enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-02_inline_sending_preview_mobile",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Inline sending preview is enabled on mobile (both iOS and Android)",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-02_inline_sending_preview_mobile"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1582099574,
    "creationDate": 1675802585,
    "type": "user",
    "title": "Inline Sending Preview Mobile",
    "description": [
      "Control",
      "Treatment 1: Inline sending preview is enabled on mobile (both iOS and Android)"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-03_activities_release_tools",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: enable activities release tools",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-03_activities_release_tools"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3482834131,
    "creationDate": 1678221785,
    "type": "user",
    "title": "Activities Release Tools",
    "description": [
      "Control",
      "Treatment 1: enable activities release tools"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-08_guild_unreads",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Allow \"Highlights\" as an Unreads Option",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-08_guild_unreads"
              ]
            }
          ]
        }
      ]
    },
    "hash": 4073302433,
    "creationDate": 1659904985,
    "type": "user",
    "title": "Guild Unreads",
    "description": [
      "Control",
      "Treatment 1: Allow \"Highlights\" as an Unreads Option"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-11_notification_redesign",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Notification Redesign Enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-11_notification_redesign"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1792467213,
    "creationDate": 1667853785,
    "type": "user",
    "title": "NotificationRedesign",
    "description": [
      "Control",
      "Treatment 1: Notification Redesign Enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-04_notification_redesign_v2",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Notification Redesign V2 Enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-04_notification_redesign_v2"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1347697298,
    "creationDate": 1680900185,
    "type": "user",
    "title": "NotificationRedesignV2",
    "description": [
      "Control",
      "Treatment 1: Notification Redesign V2 Enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-11_desktop_notification_center",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Notification center desktop enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-11_desktop_notification_center"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1323079101,
    "creationDate": 1667853785,
    "type": "user",
    "title": "Desktop notification center",
    "description": [
      "Control",
      "Treatment 1: Notification center desktop enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-07_channel_highlights",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Show Channel Highlights",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-07_channel_highlights"
              ]
            }
          ]
        }
      ]
    },
    "hash": 4169687140,
    "creationDate": 1657226585,
    "type": "user",
    "title": "Channel Highlights",
    "description": [
      "Control",
      "Treatment 1: Show Channel Highlights"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-05_dcf_improvements",
    "defaultConfig": {
      "cooldownPeriod": null,
      "dismissOnNavigation": false,
      "dailyCap": null,
      "weeklyCap": null
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Users will have a DC cooldown of 1 hour",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-05_dcf_improvements"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1171817240,
    "creationDate": 1683492185,
    "type": "user",
    "title": "DCF Improvements Experiment",
    "description": [
      "Control",
      "Treatment 1: Users will have a DC cooldown of 1 hour",
      "Treatment 2: DCs will be dismissed when a user navigates away from their surface",
      "Treatment 3: Users will be limited to seeing 2 DC a day and 6 DC a week",
      "Treatment 4: Users will be limited to seeing 2 DC a day",
      "Treatment 5: Users will be limited to seeing 3 DC a day and 9 DC a week",
      "Treatment 6: Users will be limited to seeing 3 DC a day"
    ],
    "buckets": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "2023-06_no_dcs_in_overlay",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Remove DCs",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-06_no_dcs_in_overlay"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2016786830,
    "creationDate": 1686170585,
    "type": "user",
    "title": "No DCs in Overlay",
    "description": [
      "Control",
      "Treatment 1: Remove DCs"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2021-04_network_action_logging",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Log network actions",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2021-04_network_action_logging"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3643362751,
    "creationDate": 1617828185,
    "type": "user",
    "title": "Standard Analytics: Log Network Actions",
    "description": [
      "Control",
      "Treatment 1: Log network actions"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-09_emoji_ecosystem_holdout",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: In the Emoji Ecosystem Holdout",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-09_emoji_ecosystem_holdout"
              ]
            }
          ]
        }
      ]
    },
    "hash": 667096268,
    "creationDate": 1662583385,
    "type": "user",
    "title": "Emoji Ecosystem Holdout Experiment",
    "description": [
      "Control",
      "Treatment 1: In the Emoji Ecosystem Holdout"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-09_emoji_picker_discovery",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Bigger Picker",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-09_emoji_picker_discovery"
              ]
            }
          ]
        }
      ]
    },
    "hash": 346890398,
    "creationDate": 1662583385,
    "type": "user",
    "title": "Emoji Picker Improved Discovery",
    "description": [
      "Control",
      "Treatment 1: Bigger Picker",
      "Treatment 2: Bigger Picker + Popular Server Emojis",
      "Treatment 3: Bigger Picker + Newly Added Emojis"
    ],
    "buckets": [
      0,
      1,
      2,
      3
    ]
  },
  {
    "id": "2023-02_stage_boosting",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 2,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                },
                {
                  "start": 500,
                  "end": 5000
                },
                {
                  "start": 5000,
                  "end": 9500
                },
                {
                  "start": 9500,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "COMMUNITY"
              ]
            },
            {
              "type": "range_by_hash",
              "range": 10000
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "COMMUNITY"
              ]
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "id",
              "ids": [
                "885418158788345897"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1816004721,
    "creationDate": 1675802585,
    "type": "guild",
    "title": "Stage Boosting",
    "description": [
      "Control",
      "Treatment 1: Enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2021-09_ios_screenshare_resolution_profiles",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Permanent old resolution",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2021-09_ios_screenshare_resolution_profiles"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3656427814,
    "creationDate": 1631047385,
    "type": "user",
    "title": "iOS: Screenshare resolution profiles",
    "description": [
      "Control",
      "Treatment 1: Permanent old resolution",
      "Treatment 2: Old resolution for 10s",
      "Treatment 3: Wait 3s after 1st frame capture",
      "Treatment 4: Wait 3s to capture 1st frame"
    ],
    "buckets": [
      0,
      1,
      2,
      3,
      4
    ]
  },
  {
    "id": "2022-10_communities_multi",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 2,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 2000
                },
                {
                  "start": 8000,
                  "end": 10000
                }
              ]
            },
            {
              "treatment": "Treatment 1: NMX Core",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 4000,
                  "end": 6000
                }
              ]
            },
            {
              "treatment": "Treatment 2: NMX Core + Home",
              "bucket": 2,
              "rollouts": [
                {
                  "start": 6000,
                  "end": 8000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "COMMUNITY_EXP_LARGE_UNGATED"
              ]
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 2000
                },
                {
                  "start": 8000,
                  "end": 10000
                }
              ]
            },
            {
              "treatment": "Treatment 1: NMX Core",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 4000,
                  "end": 6000
                }
              ]
            },
            {
              "treatment": "Treatment 2: NMX Core + Home",
              "bucket": 2,
              "rollouts": [
                {
                  "start": 6000,
                  "end": 8000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "COMMUNITY_EXP_LARGE_GATED"
              ]
            }
          ]
        }
      ],
      "overrides": [],
      "overrides_formatted": []
    },
    "hash": 2457903107,
    "creationDate": 1665175385,
    "type": "guild",
    "title": "A multi-arm guild experiment that segments all eligible guilds to test different combinations of the Communities 2.0 experience",
    "description": [
      "Control",
      "Treatment 0: Holdout",
      "Treatment 1: NMX Core",
      "Treatment 2: NMX Core + Home",
      "Treatment 3: NMX Core + Highlights",
      "Treatment 4: Home"
    ],
    "buckets": [
      0,
      0,
      1,
      2,
      3,
      4
    ]
  },
  {
    "id": "2022-01_home_tab_guild",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 4,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [
        {
          "treatment": "Control",
          "bucket": 0,
          "ids": [
            "814669604840013874"
          ]
        },
        {
          "treatment": "Treatment 2: Force on",
          "bucket": 2,
          "ids": [
            "662267976984297473"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 3832113202,
    "creationDate": 1641588185,
    "type": "guild",
    "title": "Home Tab Guild",
    "description": [
      "Control",
      "Treatment 1: Check User as well",
      "Treatment 2: Force on"
    ],
    "buckets": [
      0,
      1,
      2
    ]
  },
  {
    "id": "2022-01_home_tab_user",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Show Home Tab",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-01_home_tab_user"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3656796460,
    "creationDate": 1641588185,
    "type": "user",
    "title": "Home Tab User",
    "description": [
      "Control",
      "Treatment 1: Show Home Tab",
      "Treatment 2: Force on",
      "Treatment 3: Overflow"
    ],
    "buckets": [
      0,
      1,
      2,
      3
    ]
  },
  {
    "id": "2022-01_home_feed_toggle",
    "defaultConfig": {
      "showSelector": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Yes Selector",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-01_home_feed_toggle"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1124154177,
    "creationDate": 1641588185,
    "type": "user",
    "title": "Show Guild Feed Sorting Selector",
    "description": [
      "Control",
      "Treatment 1: Yes Selector"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-06_home_refresh_button",
    "defaultConfig": {
      "showRefreshButton": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Yes button",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-06_home_refresh_button"
              ]
            }
          ]
        }
      ]
    },
    "hash": 853790804,
    "creationDate": 1654634585,
    "type": "user",
    "title": "Show refresh button",
    "description": [
      "Control",
      "Treatment 1: Yes button"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-08_home_badge",
    "defaultConfig": {
      "showBadge": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: show badge",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-08_home_badge"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2294464289,
    "creationDate": 1659904985,
    "type": "user",
    "title": "Show badge on home channel",
    "description": [
      "Control",
      "Treatment 1: show badge"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-08_home_drawer_autoclose",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: normal animation",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-08_home_drawer_autoclose"
              ]
            }
          ]
        }
      ]
    },
    "hash": 75117039,
    "creationDate": 1659904985,
    "type": "user",
    "title": "Auto close home drawer",
    "description": [
      "Control",
      "Treatment 1: normal animation",
      "Treatment 2: no animate",
      "Treatment 3: 150 delayed animation",
      "Treatment 4: 250 delayed animation",
      "Treatment 5: 500 delayed animation"
    ],
    "buckets": [
      0,
      1,
      2,
      3,
      4,
      5
    ]
  },
  {
    "id": "2022-09_welcome_header",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: show welcome header",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-09_welcome_header"
              ]
            }
          ]
        }
      ]
    },
    "hash": 683339869,
    "creationDate": 1662583385,
    "type": "user",
    "title": "Show welcome header for home",
    "description": [
      "Control",
      "Treatment 1: show welcome header"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-12_home_feedback_ux",
    "defaultConfig": {
      "showFeedback": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-12_home_feedback_ux"
              ]
            }
          ]
        }
      ]
    },
    "hash": 655899426,
    "creationDate": 1670445785,
    "type": "user",
    "title": "Show post feedback for home",
    "description": [
      "Control",
      "Treatment 100: show feedback"
    ],
    "buckets": [
      0,
      100
    ]
  },
  {
    "id": "2023-03_home_deprecation",
    "defaultConfig": {
      "showDeprecationNotice": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Show notice",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "range_by_hash",
              "range": 10000
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": []
    },
    "hash": 280214844,
    "creationDate": 1678221785,
    "type": "guild",
    "title": "Home Deprecation",
    "description": [
      "Control",
      "Treatment 1: Show notice"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-03_free_discord_stickers",
    "defaultConfig": {
      "freeStickersEnabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-03_free_discord_stickers"
              ]
            }
          ]
        }
      ]
    },
    "hash": 887694445,
    "creationDate": 1678221785,
    "type": "user",
    "title": "Free Default Stickers",
    "description": [
      "Control",
      "Treatment 1: Enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-05_land_on_server_guide",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Users land on server guide when joining a guild via invite",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-05_land_on_server_guide"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3172321247,
    "creationDate": 1683492185,
    "type": "user",
    "title": "Land users on server guide",
    "description": [
      "Control",
      "Treatment 1: Users land on server guide when joining a guild via invite",
      "Treatment 42: [untracked] Users land on server guide when joining a guild via invite"
    ],
    "buckets": [
      0,
      1,
      42
    ]
  },
  {
    "id": "2022-10_text_in_stage",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 2,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable Text-In-Stage",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "COMMUNITY"
              ]
            },
            {
              "type": "range_by_hash",
              "range": 10000
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "COMMUNITY"
              ]
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable Text-In-Stage",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "INTERNAL_EMPLOYEE_ONLY"
              ]
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable Text-In-Stage",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "TEXT_IN_STAGE_ENABLED"
              ]
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable Text-In-Stage",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "id",
              "ids": [
                "885418158788345897"
              ]
            }
          ]
        }
      ]
    },
    "hash": 848173753,
    "creationDate": 1665175385,
    "type": "guild",
    "title": "Text-In-Stage",
    "description": [
      "Control",
      "Treatment 1: Enable Text-In-Stage"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-12_forum_activity",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-12_forum_activity"
              ]
            }
          ]
        }
      ]
    },
    "hash": 828081447,
    "creationDate": 1670445785,
    "type": "user",
    "title": "Increased activity view for Forums, per user",
    "description": [
      "Control",
      "Treatment 1: Enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-01_forums_activity_2_guild",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 1,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: Enabled",
          "bucket": 1,
          "ids": [
            "651595875897835540",
            "889924024367452241",
            "1012394956247269376",
            "936317138904440892",
            "257310633211461633",
            "525734532440260618",
            "353315134678106113",
            "274702265321783297",
            "182121241111560192",
            "929506677512867911",
            "740310317954891846",
            "86312116675448832",
            "891286303574994974",
            "246604458744610816"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 4081692393,
    "creationDate": 1673124185,
    "type": "guild",
    "title": "Increased activity view for Forums, per guild",
    "description": [
      "Control",
      "Treatment 1: Enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-03_pomelo_compatible_ux",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-03_pomelo_compatible_ux"
              ]
            }
          ]
        }
      ]
    },
    "hash": 671665651,
    "creationDate": 1678221785,
    "type": "user",
    "title": "Pomelo Compatibility",
    "description": [
      "Control",
      "Treatment 1: enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2021-11_member_verification_manual_approval",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable manual approval for membership verification",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "MEMBER_VERIFICATION_MANUAL_APPROVAL"
              ]
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable manual approval for membership verification",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "id",
              "ids": [
                "991365865532575844",
                "809846768074227723",
                "809844301353320558",
                "840296607785287763",
                "651597514407018516"
              ]
            }
          ]
        }
      ]
    },
    "hash": 4089758233,
    "creationDate": 1636317785,
    "type": "guild",
    "title": "Member Verification Manual Approval",
    "description": [
      "Control",
      "Treatment 1: Enable manual approval for membership verification"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-05_guild_member_safety_experiment",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: Guild Member Safety Experiment",
          "bucket": 1,
          "ids": [
            "763838479293349899"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 603648674,
    "creationDate": 1683492185,
    "type": "guild",
    "title": "Guild Member Safety Experiment",
    "description": [
      "Control",
      "Treatment 1: Guild Member Safety Experiment"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2021-04_impression_logging",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Log impressions",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2021-04_impression_logging"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3354177721,
    "creationDate": 1617828185,
    "type": "user",
    "title": "Standard Analytics: Log Impressions",
    "description": [
      "Control",
      "Treatment 1: Log impressions"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-01_emoji_discovery_backfill",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Backfills Hotrail With Emojis",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-01_emoji_discovery_backfill"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2013557659,
    "creationDate": 1673124185,
    "type": "user",
    "title": "Emoji Hotrail Backfill",
    "description": [
      "Control",
      "Treatment 1: Backfills Hotrail With Emojis"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-08_amoled_mode_web",
    "defaultConfig": {
      "enabledAMOLEDThemeOption": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled AMOLED Theme Option",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-08_amoled_mode_web"
              ]
            }
          ]
        }
      ]
    },
    "hash": 4202366309,
    "creationDate": 1659904985,
    "type": "user",
    "title": "Enabled AMOLED Mode on Web",
    "description": [
      "Control",
      "Treatment 1: Enabled AMOLED Theme Option"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-11_clips_experiment",
    "defaultConfig": {
      "enableClips": false,
      "enableUpsells": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Clips without upsells",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-11_clips_experiment"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1651184307,
    "creationDate": 1667853785,
    "type": "user",
    "title": "Clips Experiment",
    "description": [
      "Control",
      "Treatment 1: Clips without upsells",
      "Treatment 2: Clips with upsells"
    ],
    "buckets": [
      0,
      1,
      2
    ]
  },
  {
    "id": "2023-01_silent_messages",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Allow sending @silent messages",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-01_silent_messages"
              ]
            }
          ]
        }
      ]
    },
    "hash": 183688925,
    "creationDate": 1673124185,
    "type": "user",
    "title": "Silent Messages",
    "description": [
      "Control",
      "Treatment 1: Allow sending @silent messages"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-01_activities_in_gdm",
    "defaultConfig": {
      "isActivitiesInGdmEnabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: enable Activities in GDMs",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-01_activities_in_gdm"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1834860859,
    "creationDate": 1673124185,
    "type": "user",
    "title": "Activities in GDM",
    "description": [
      "Control",
      "Treatment 1: enable Activities in GDMs"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-03_clyde_ai",
    "defaultConfig": {
      "experimentState": 0
    },
    "rollout": {
      "revision": 2,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled (Default Off)",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "CLYDE_EXPERIMENT_ENABLED",
                "INTERNAL_EMPLOYEE_ONLY"
              ]
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "COMMUNITY"
              ]
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 2200,
                  "end": 10000
                }
              ]
            },
            {
              "treatment": "Treatment 1: Enabled (Default Off)",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 100
                }
              ]
            },
            {
              "treatment": "Treatment 3: Enabled (Default On)",
              "bucket": 3,
              "rollouts": [
                {
                  "start": 200,
                  "end": 1200
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "member_count",
              "range": {
                "start": 0,
                "end": 100
              }
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 2000,
                  "end": 10000
                }
              ]
            },
            {
              "treatment": "Treatment 3: Enabled (Default On)",
              "bucket": 3,
              "rollouts": [
                {
                  "start": 0,
                  "end": 1000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "member_count",
              "range": {
                "start": 101,
                "end": 200
              }
            }
          ]
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: Enabled (Default Off)",
          "bucket": 1,
          "ids": [
            "860609921602682910",
            "869772539071713340",
            "993957185493160057",
            "690040107322966037",
            "954241501922213940",
            "411964563278397440",
            "363154169294618625",
            "819703530423975956",
            "132189483301863424",
            "132751006349000704",
            "133838756447911936",
            "409190184744255490",
            "922748688403693578",
            "772904309264089089",
            "358811058489524225",
            "576105656881512450",
            "612443491770957833",
            "116294130149097479",
            "309711518948392961",
            "209707792314007552",
            "883039603144155197",
            "878697917374939256",
            "771800742977077289"
          ]
        },
        {
          "treatment": "Treatment 3: Enabled (Default On)",
          "bucket": 3,
          "ids": [
            "1097934938763968565"
          ]
        },
        {
          "treatment": "Treatment 4: Coming Soon",
          "bucket": 4,
          "ids": [
            "938884225459957902"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 4083096281,
    "creationDate": 1678221785,
    "type": "guild",
    "title": "ClydeAI",
    "description": [
      "Control",
      "Treatment 1: Enabled (Default Off)",
      "Treatment 3: Enabled (Default On)",
      "Treatment 4: Coming Soon"
    ],
    "buckets": [
      0,
      1,
      3,
      4
    ]
  },
  {
    "id": "2023-02_discord_embeds",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enables fancy embedded links instead of raw Discord links",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-02_discord_embeds"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1353647162,
    "creationDate": 1675802585,
    "type": "user",
    "title": "Discord embeds",
    "description": [
      "Control",
      "Treatment 1: Enables fancy embedded links instead of raw Discord links"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-02_nitroduction_experience",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: One month trial users recieve the Nitroduction experience",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-02_nitroduction_experience"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2956169075,
    "creationDate": 1675802585,
    "type": "user",
    "title": "Nitroduction Experience",
    "description": [
      "Control",
      "Treatment 1: One month trial users recieve the Nitroduction experience"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-04_nitro_drop_announcement_modal",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled Nitro April Drop announcement modal",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-04_nitro_drop_announcement_modal"
              ]
            }
          ]
        }
      ]
    },
    "hash": 4190502511,
    "creationDate": 1680900185,
    "type": "user",
    "title": "2023 Nitro April Drop Announcement Modal",
    "description": [
      "Control",
      "Treatment 1: Enabled Nitro April Drop announcement modal"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-04_nitro_drop_experience",
    "defaultConfig": {
      "isEnabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled Nitro April Drop Experience (apart from the announcement modal)",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-04_nitro_drop_experience"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2753834830,
    "creationDate": 1680900185,
    "type": "user",
    "title": "2023 Nitro April Drop Experience",
    "description": [
      "Control",
      "Treatment 1: Enabled Nitro April Drop Experience (apart from the announcement modal)"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-03_april_fools",
    "defaultConfig": {
      "allowAprilFoolsSoundpack": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: April Fools 2023",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-03_april_fools"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3971730794,
    "creationDate": 1678221785,
    "type": "user",
    "title": "April Fools 2023",
    "description": [
      "Control",
      "Treatment 1: April Fools 2023"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-05_collectibles",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Nitro with collecting",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-05_collectibles"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2455278797,
    "creationDate": 1683492185,
    "type": "user",
    "title": "Collectibles",
    "description": [
      "Control",
      "Treatment 1: Nitro with collecting",
      "Treatment 2: Non-nitro with collecting upsells",
      "Treatment 3: Non-nitro with temporary avatar decorations upsells",
      "Treatment 100: collecting with uploading"
    ],
    "buckets": [
      0,
      1,
      2,
      3,
      100
    ]
  },
  {
    "id": "2023-05_avatar_decorations",
    "defaultConfig": {
      "canUseAvatarDecorations": false,
      "canUploadAvatarDecorations": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Allow use of avatar decorations nitro",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-05_avatar_decorations"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3542432067,
    "creationDate": 1683492185,
    "type": "user",
    "title": "Avatar Decorations Birthday 2023",
    "description": [
      "Control",
      "Treatment 1: Allow use of avatar decorations nitro",
      "Treatment 2: Allow use of avatar decorations non-nitro",
      "Treatment 100: Debug"
    ],
    "buckets": [
      0,
      1,
      2,
      100
    ]
  },
  {
    "id": "2023-05_clyde_ai_dm",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: enable dms to clyde",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-05_clyde_ai_dm"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1906632964,
    "creationDate": 1683492185,
    "type": "user",
    "title": "DMs to Clyde",
    "description": [
      "Control",
      "Treatment 1: enable dms to clyde"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-01_pronouns",
    "defaultConfig": {
      "showPronouns": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Show Pronouns",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-01_pronouns"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1176769702,
    "creationDate": 1641588185,
    "type": "user",
    "title": "Pronouns in Profile",
    "description": [
      "Control",
      "Treatment 1: Show Pronouns"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-02_app_recommendations_server_checklist",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 2,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Show recommendation to add apps in new server checklist",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": []
    },
    "hash": 3320756132,
    "creationDate": 1675802585,
    "type": "guild",
    "title": "Application Recommendation Server Checklist Experiment",
    "description": [
      "Control",
      "Treatment 1: Show recommendation to add apps in new server checklist"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-03_improved_message_markdown",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Show improved message markdown",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-03_improved_message_markdown"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1859132618,
    "creationDate": 1678221785,
    "type": "user",
    "title": "Improved Message Markdown ",
    "description": [
      "Control",
      "Treatment 1: Show improved message markdown",
      "Treatment 2: Show improved message markdown WITHOUT masked links"
    ],
    "buckets": [
      0,
      1,
      2
    ]
  },
  {
    "id": "2023-03_improved_message_markdown_guild",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 1,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 2: Show improved message markdown WITHOUT masked links",
              "bucket": 2,
              "rollouts": [
                {
                  "start": 0,
                  "end": 1000
                },
                {
                  "start": 1000,
                  "end": 2000
                },
                {
                  "start": 2000,
                  "end": 3500
                },
                {
                  "start": 3500,
                  "end": 5000
                },
                {
                  "start": 5000,
                  "end": 7500
                },
                {
                  "start": 7500,
                  "end": 9000
                },
                {
                  "start": 9000,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "range_by_hash",
              "range": 10000
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        },
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Show improved message markdown",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "id",
              "ids": [
                "1103353437619503138"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1489979462,
    "creationDate": 1678221785,
    "type": "guild",
    "title": "Improved Message Markdown Guild Experiment",
    "description": [
      "Control",
      "Treatment 1: Show improved message markdown",
      "Treatment 2: Show improved message markdown WITHOUT masked links"
    ],
    "buckets": [
      0,
      1,
      2
    ]
  },
  {
    "id": "2023-05_popular_slash_commands_mobile",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Show Popular Commands section",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-05_popular_slash_commands_mobile"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1146223059,
    "creationDate": 1683492185,
    "type": "user",
    "title": "Popular Slash Commands Mobile",
    "description": [
      "Control",
      "Treatment 1: Show Popular Commands section"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-05_inventory_guild_packs",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-05_inventory_guild_packs"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1473329304,
    "creationDate": 1683492185,
    "type": "user",
    "title": "Invenotry Guild Packs Experiment",
    "description": [
      "Control",
      "Treatment 1: Enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-02_p13n_summarization",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 2,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 2: Enable channel summaries GA",
              "bucket": 2,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "SUMMARIES_ENABLED_GA"
              ]
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable channel summaries",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "SUMMARIES_ENABLED"
              ]
            }
          ]
        }
      ],
      "overrides": [],
      "overrides_formatted": []
    },
    "hash": 1504498621,
    "creationDate": 1675802585,
    "type": "guild",
    "title": "Channel Summaries Guild Experiment",
    "description": [
      "Control",
      "Treatment 1: Enable channel summaries",
      "Treatment 2: Enable channel summaries GA"
    ],
    "buckets": [
      0,
      1,
      2
    ]
  },
  {
    "id": "2023-03_p13n_summarization_user",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable channel summaries",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-03_p13n_summarization_user"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3283745071,
    "creationDate": 1678221785,
    "type": "user",
    "title": "Channel Summaries User Experiment",
    "description": [
      "Control",
      "Treatment 1: Enable channel summaries"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-03_apps_in_gdms",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Show apps in gdm",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-03_apps_in_gdms"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3375543773,
    "creationDate": 1678221785,
    "type": "user",
    "title": "Apps in GDMs",
    "description": [
      "Control",
      "Treatment 1: Show apps in gdm"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-07_voice_in_threads",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 1: On",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "VOICE_IN_THREADS"
              ]
            }
          ]
        }
      ],
      "overrides": [],
      "overrides_formatted": []
    },
    "hash": 944104242,
    "creationDate": 1657226585,
    "type": "guild",
    "title": "Voice in Threads",
    "description": [
      "Control",
      "Treatment 1: On"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-11_command_query_pagination",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-11_command_query_pagination"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2206139940,
    "creationDate": 1667853785,
    "type": "user",
    "title": "Command Query Pagination",
    "description": [
      "Control",
      "Treatment 1: Enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-05_lock_icon",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-05_lock_icon"
              ]
            }
          ]
        }
      ]
    },
    "hash": 853908483,
    "creationDate": 1683492185,
    "type": "user",
    "title": "Checkout Lock Icon",
    "description": [
      "Control",
      "Treatment 1: Enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-03_block_russian_purchases",
    "defaultConfig": {
      "paymentsBlocked": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Payments Blocked",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-03_block_russian_purchases"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3011681066,
    "creationDate": 1646685785,
    "type": "user",
    "title": "Block purchases based on country",
    "description": [
      "Control",
      "Treatment 1: Payments Blocked"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-03_block_russian_purchases_desktop",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Check Payment Source",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-03_block_russian_purchases_desktop"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1814483290,
    "creationDate": 1646685785,
    "type": "user",
    "title": "Block purchases based on country (desktop specific flags)",
    "description": [
      "Control",
      "Treatment 1: Check Payment Source"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-07_report_raids",
    "defaultConfig": {
      "enableRaidReporting": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable Reporting Of Raids",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "range_by_hash",
              "range": 10000
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": []
    },
    "hash": 1055563741,
    "creationDate": 1657226585,
    "type": "guild",
    "title": "Report Raids",
    "description": [
      "Control",
      "Treatment 1: Enable Reporting Of Raids"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-10_guild_raid_messaging",
    "defaultConfig": {
      "enableRaidAlerts": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable Reporting Of Raids",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "COMMUNITY"
              ]
            }
          ]
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: Enable Reporting Of Raids",
          "bucket": 1,
          "ids": [
            "816784679717044276",
            "763838479293349899",
            "435572461912719360",
            "1044378460296061008",
            "876918412369088582",
            "1044721355821678662",
            "1034492236483792958",
            "912834371034181642",
            "809846768074227723",
            "999116324842246224",
            "987012965834297405",
            "942897714956472401",
            "169256939211980800",
            "987122927000494131"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 3636231100,
    "creationDate": 1665175385,
    "type": "guild",
    "title": "Raid Alerts",
    "description": [
      "Control",
      "Treatment 1: Enable Reporting Of Raids"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-03_guild_safety_settings",
    "defaultConfig": {
      "showSafetySettings": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Show safety check in settings",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "COMMUNITY"
              ]
            }
          ]
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: Show safety check in settings",
          "bucket": 1,
          "ids": [
            "1080899969243943072",
            "763838479293349899"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 1640064366,
    "creationDate": 1678221785,
    "type": "guild",
    "title": "Safety check in guild settings",
    "description": [
      "Control",
      "Treatment 1: Show safety check in settings"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-12_premium_targeted_upsells",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Use highest expected value to determine Nitro upsells",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-12_premium_targeted_upsells"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2067676101,
    "creationDate": 1670445785,
    "type": "user",
    "title": "Premium Targeted Upsells",
    "description": [
      "Control",
      "Treatment 1: Use highest expected value to determine Nitro upsells",
      "Treatment 2: Use highest likelihood to determine Nitro upsells"
    ],
    "buckets": [
      0,
      1,
      2
    ]
  },
  {
    "id": "2022-09_premium_tier_0_global",
    "defaultConfig": {
      "enableTier0": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Variant 1",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-09_premium_tier_0_global"
              ]
            }
          ]
        }
      ]
    },
    "hash": 102690720,
    "creationDate": 1662583385,
    "type": "user",
    "title": "Premium tier 0 (Global)",
    "description": [
      "Control",
      "Treatment 1: Variant 1",
      "Treatment 2: Variant 2"
    ],
    "buckets": [
      0,
      1,
      2
    ]
  },
  {
    "id": "2023-02_mfa_remove_phone",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-02_mfa_remove_phone"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3346916614,
    "creationDate": 1675802585,
    "type": "user",
    "title": "Safety Experience MFA Remove Phone",
    "description": [
      "Control",
      "Treatment 1: Enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2021-03_expiration_notice_mobile_web",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Show expiration notice",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2021-03_expiration_notice_mobile_web"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3623906145,
    "creationDate": 1615149785,
    "type": "user",
    "title": "Show expiration notice on mobile web invite",
    "description": [
      "Control",
      "Treatment 1: Show expiration notice"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2021-03_expiration_notice_ios",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Show expiration notice",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2021-03_expiration_notice_ios"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2088781100,
    "creationDate": 1615149785,
    "type": "user",
    "title": "Show expiration notice on ios invite",
    "description": [
      "Control",
      "Treatment 1: Show expiration notice"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2021-03_expiration_notice_ios_embed",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Show expiration notice",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2021-03_expiration_notice_ios_embed"
              ]
            }
          ]
        }
      ]
    },
    "hash": 733758152,
    "creationDate": 1615149785,
    "type": "user",
    "title": "Show expiration notice on ios invite embed",
    "description": [
      "Control",
      "Treatment 1: Show expiration notice"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2021-07_role_popout",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable Popout",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2021-07_role_popout"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1428438599,
    "creationDate": 1625690585,
    "type": "user",
    "title": "Role Popout",
    "description": [
      "Control",
      "Treatment 1: Enable Popout"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-09_mobile_account_switcher",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable Account Switcher on Mobile",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-09_mobile_account_switcher"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2001067746,
    "creationDate": 1662583385,
    "type": "user",
    "title": "Mobile Account Switcher",
    "description": [
      "Control",
      "Treatment 1: Enable Account Switcher on Mobile",
      "Treatment 2: Unenroll Account Switcher on Mobile and Clear Local Flag"
    ],
    "buckets": [
      0,
      1,
      2
    ]
  },
  {
    "id": "2022-11_mobile_account_switcher_notifications",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable notifications for multiple accounts",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-11_mobile_account_switcher_notifications"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1333727,
    "creationDate": 1667853785,
    "type": "user",
    "title": "Mobile Account Switcher: Notifications",
    "description": [
      "Control",
      "Treatment 1: Enable notifications for multiple accounts"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-04_registration_copy_updates",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Continue / Copy Above Button / High Prominence Copy",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-04_registration_copy_updates"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1115221338,
    "creationDate": 1649364185,
    "type": "user",
    "title": "Registration Copy Updates",
    "description": [
      "Control",
      "Treatment 1: Continue / Copy Above Button / High Prominence Copy",
      "Treatment 2: Continue / Copy Below Button / High Prominence Copy",
      "Treatment 3: Continue / Copy Above Button / Normal Prominence Copy"
    ],
    "buckets": [
      0,
      1,
      2,
      3
    ]
  },
  {
    "id": "2022-08_back_to_school",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Back to School experience enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-08_back_to_school"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2676348506,
    "creationDate": 1659904985,
    "type": "user",
    "title": "Back to School Event",
    "description": [
      "Control",
      "Treatment 1: Back to School experience enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-04_soundboard_nitro",
    "defaultConfig": {
      "isPremiumFeature": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Include Soundboard as a Nitro feature",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-04_soundboard_nitro"
              ]
            }
          ]
        }
      ]
    },
    "hash": 325693975,
    "creationDate": 1680900185,
    "type": "user",
    "title": "Soundboard Nitro",
    "description": [
      "Control",
      "Treatment 1: Include Soundboard as a Nitro feature"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-04_fast_new_channels",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 1: On",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "COMMUNITY_CANARY"
              ]
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "Treatment 1: On",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: On",
          "bucket": 1,
          "ids": [
            "651595875897835540"
          ]
        },
        {
          "bucket": 42,
          "ids": [
            "1080899969243943072"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 4063488887,
    "creationDate": 1680900185,
    "type": "guild",
    "title": "Fast New Channels",
    "description": [
      "Control",
      "Treatment 1: On"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-12_get_my_guilds_application_ids_endpoint",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-12_get_my_guilds_application_ids_endpoint"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3772658100,
    "creationDate": 1670445785,
    "type": "user",
    "title": "Get My Guilds' Application IDs Endpoint Experiment",
    "description": [
      "Control",
      "Treatment 1: Enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-02_app_directory_for_all_modal",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-02_app_directory_for_all_modal"
              ]
            }
          ]
        }
      ]
    },
    "hash": 968202795,
    "creationDate": 1675802585,
    "type": "user",
    "title": "App Directory Upsell For All Modal",
    "description": [
      "Control",
      "Treatment 1: Enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-02_referral_trials",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Nitro users can send a Nitro trial offer to another user.",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-02_referral_trials"
              ]
            }
          ]
        }
      ]
    },
    "hash": 4247951256,
    "creationDate": 1675802585,
    "type": "user",
    "title": "Referral Trials",
    "description": [
      "Control",
      "Treatment 1: Nitro users can send a Nitro trial offer to another user."
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2021-02_staff_qc_debugging",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Show scores in QS results",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2021-02_staff_qc_debugging"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2847059306,
    "creationDate": 1612730585,
    "type": "user",
    "title": "Display QS scores in results. Not a real experiment",
    "description": [
      "Control",
      "Treatment 1: Show scores in QS results"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-05_activities_joinleave_sounds",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable Activities Join/Leave Sounds",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-05_activities_joinleave_sounds"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3190368920,
    "creationDate": 1683492185,
    "type": "user",
    "title": "Activities Sounds Experiment",
    "description": [
      "Control",
      "Treatment 1: Enable Activities Join/Leave Sounds"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-04_null_experiment",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: On",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-04_null_experiment"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1045730203,
    "creationDate": 1680900185,
    "type": "user",
    "title": "Null Experiment",
    "description": [
      "Control",
      "Treatment 1: On"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-09_inboxes_v2_frontend",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-09_inboxes_v2_frontend"
              ]
            }
          ]
        }
      ]
    },
    "hash": 472975400,
    "creationDate": 1662583385,
    "type": "user",
    "title": "Safety Integrity Platform Inboxes V2",
    "description": [
      "Control",
      "Treatment 1: Enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2021-07_popout_autocomplete",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: New autocomplete style",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2021-07_popout_autocomplete"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1900424093,
    "creationDate": 1625690585,
    "type": "user",
    "title": "Popout Autocomplete experiment",
    "description": [
      "Control",
      "Treatment 1: New autocomplete style"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-05_fullyemojiautocomplete",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Hide Stickers, only show 10 Emojis",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-05_fullyemojiautocomplete"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3138896883,
    "creationDate": 1683492185,
    "type": "user",
    "title": "Only show emoji in autocomplete",
    "description": [
      "Control",
      "Treatment 1: Hide Stickers, only show 10 Emojis",
      "Treatment 2: Hide Stickers, show more Emojis without scrollbar",
      "Treatment 3: Hide Stickers, show more Emojis with scrollbar"
    ],
    "buckets": [
      0,
      1,
      2,
      3
    ]
  },
  {
    "id": "2023-05_ugc_notifications",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: Show Notifications",
          "bucket": 1,
          "ids": [
            "1096485049760759972",
            "1096492110254964809",
            "705666251560583168"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 631733804,
    "creationDate": 1683492185,
    "type": "guild",
    "title": "Notifications for UGC changes",
    "description": [
      "Control",
      "Treatment 1: Show Notifications"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2021-03_nitro_emoji_autocomplete_upsell",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Show emoji autocomplete upsell",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2021-03_nitro_emoji_autocomplete_upsell"
              ]
            }
          ]
        }
      ]
    },
    "hash": 259025033,
    "creationDate": 1615149785,
    "type": "user",
    "title": "Emoji Autocomplete Upsell",
    "description": [
      "Control",
      "Treatment 1: Show emoji autocomplete upsell"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2021-04_nitro_emoji_autocomplete_upsell_ios",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Show emoji autocomplete upsell",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2021-04_nitro_emoji_autocomplete_upsell_ios"
              ]
            }
          ]
        }
      ]
    },
    "hash": 371152535,
    "creationDate": 1617828185,
    "type": "user",
    "title": "Emoji Autocomplete Upsell iOS",
    "description": [
      "Control",
      "Treatment 1: Show emoji autocomplete upsell"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-04_server_badging",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: Enable Server Badging",
          "bucket": 1,
          "ids": [
            "651595875897835540",
            "876918412369088582",
            "1105576287197724786",
            "1105576346555523218",
            "1105576413635039282",
            "1105576433633472532",
            "1105576549056528457",
            "1105576609928445964",
            "1105576653742166106",
            "1039940765750665226",
            "1105952274511057058",
            "1105952651960668323",
            "1105953713673228358",
            "1105953777212739716",
            "816784679717044276"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 41612842,
    "creationDate": 1680900185,
    "type": "guild",
    "title": "Server Badging",
    "description": [
      "Control",
      "Treatment 1: Enable Server Badging"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-04_guild_alert_mode",
    "defaultConfig": {
      "showAlertMode": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: Show alert mode experimence",
          "bucket": 1,
          "ids": [
            "816784679717044276",
            "874345844743213126",
            "840296607785287763",
            "1113529666989469708"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 2710924848,
    "creationDate": 1680900185,
    "type": "guild",
    "title": "Guild Alert Mode",
    "description": [
      "Control",
      "Treatment 1: Show alert mode experimence"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-07_invites_disabled",
    "defaultConfig": {
      "enableInvitesDisabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable Reporting Of Raids",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "PARTNERED"
              ]
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable Reporting Of Raids",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "COMMUNITY"
              ]
            }
          ]
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: Enable Reporting Of Raids",
          "bucket": 1,
          "ids": [
            "763838479293349899",
            "651597514407018516",
            "897162092652683314",
            "270301680212508673",
            "403312145938382849",
            "816784679717044276",
            "991365865532575844"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 3683063649,
    "creationDate": 1657226585,
    "type": "guild",
    "title": "Report Raids",
    "description": [
      "Control",
      "Treatment 1: Enable Reporting Of Raids"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-12_timestamp_tooltip",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-12_timestamp_tooltip"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1978665225,
    "creationDate": 1670445785,
    "type": "user",
    "title": "Timestamp Tooltip",
    "description": [
      "Control",
      "Treatment 1: Enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-03_mj_chat_bar_user",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-03_mj_chat_bar_user"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1396216677,
    "creationDate": 1678221785,
    "type": "user",
    "title": "MJ Chat Bar user experiment",
    "description": [
      "Control",
      "Treatment 1: Enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-03_mj_chat_bar_guild",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "id",
              "ids": [
                "662267976984297473"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2182959876,
    "creationDate": 1678221785,
    "type": "guild",
    "title": "MJ Chat Bar enabled guilds",
    "description": [
      "Control",
      "Treatment 1: Enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-12_seasonal_gifting",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-12_seasonal_gifting"
              ]
            }
          ]
        }
      ]
    },
    "hash": 184775741,
    "creationDate": 1670445785,
    "type": "user",
    "title": "Seasonal Gifting",
    "description": [
      "Control",
      "Treatment 1: Enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-05_referral_trials_birthday_moment",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Users will see the birthday moment referral trial UX",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-05_referral_trials_birthday_moment"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3364594544,
    "creationDate": 1683492185,
    "type": "user",
    "title": "Referral Trials Birthday Moment",
    "description": [
      "Control",
      "Treatment 1: Users will see the birthday moment referral trial UX"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2021-12_inferno_spam_redaction",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Allow guild channel messages from spammers to be collapsed",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2021-12_inferno_spam_redaction"
              ]
            }
          ]
        }
      ]
    },
    "hash": 4179344527,
    "creationDate": 1638909785,
    "type": "user",
    "title": "Inferno Spam Redaction",
    "description": [
      "Control",
      "Treatment 1: Allow guild channel messages from spammers to be collapsed"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-03_birthday_activities",
    "defaultConfig": {
      "enabled": false,
      "shareEnabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable Birthday Activities",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-03_birthday_activities"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1389690772,
    "creationDate": 1678221785,
    "type": "user",
    "title": "Birthday Activities",
    "description": [
      "Control",
      "Treatment 1: Enable Birthday Activities",
      "Treatment 2: Geo test Enable Birthday Activities but no share"
    ],
    "buckets": [
      0,
      1,
      2
    ]
  },
  {
    "id": "2023-03_guild_media_channel",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 2500,
                  "end": 10000
                }
              ]
            },
            {
              "treatment": "Treatment 1: Enables guild to create a media channel",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 2500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "ROLE_SUBSCRIPTIONS_ENABLED"
              ]
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: Enables guild to create a media channel",
          "bucket": 1,
          "ids": [
            "651595875897835540",
            "963913819418161182",
            "1082392097254023199",
            "1090311153802031315",
            "1042148168726487101",
            "816784679717044276",
            "803095016154071093",
            "612443491770957833",
            "706356477765353563",
            "443584877829554177",
            "844508269840957460",
            "756644176610721842",
            "84789673121038336",
            "805831366406438912",
            "106650112222060544",
            "804414667551670335",
            "310723715447128064",
            "585577383847788554",
            "985363294221123594",
            "530119670133555210",
            "964645662866173972",
            "915336728707989534"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 3890564237,
    "creationDate": 1678221785,
    "type": "guild",
    "title": "Media Channel",
    "description": [
      "Control",
      "Treatment 1: Enables guild to create a media channel"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-04_guild_media_channel_post_preview_embed_users",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enables for users Guild Media Post Preview Embeds",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-04_guild_media_channel_post_preview_embed_users"
              ]
            }
          ]
        }
      ]
    },
    "hash": 288968706,
    "creationDate": 1680900185,
    "type": "user",
    "title": "Guild Role Subscription Users",
    "description": [
      "Control",
      "Treatment 1: Enables for users Guild Media Post Preview Embeds"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2020-01_in_app_reporting",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Control: No changes",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2020-01_in_app_reporting"
              ]
            }
          ]
        }
      ]
    },
    "hash": 4181417939,
    "creationDate": 1578429785,
    "type": "user",
    "title": "2020-29 Exp: Report TOS violating messages in-app via new modal",
    "description": [
      "An experiment that tests if in-app reporting is useful for Trust & Safety",
      "Control: No changes",
      "Treatment 1: Add menu options to report message"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-08_message_todos_staff_only",
    "defaultConfig": {
      "showReminders": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Show message TODOs CTA",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-08_message_todos_staff_only"
              ]
            }
          ]
        }
      ]
    },
    "hash": 4170652702,
    "creationDate": 1659904985,
    "type": "user",
    "title": "Message TODO list",
    "description": [
      "Control",
      "Treatment 1: Show message TODOs CTA"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-11_automod_non_community_guilds_release",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "COMMUNITY"
              ]
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "Treatment 1: Automod Non-Community Guilds Release",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "member_count",
              "range": {
                "start": 0,
                "end": 300
              }
            },
            {
              "type": "range_by_hash",
              "range": 10000
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "member_count",
              "range": {
                "start": 0,
                "end": 300
              }
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "Treatment 1: Automod Non-Community Guilds Release",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "range_by_hash",
              "range": 10000
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Automod Non-Community Guilds Release",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "id",
              "ids": [
                "907770923799674880",
                "1044297931039199233",
                "1044374869414002758",
                "854800679930822667",
                "763838479293349899",
                "1044727347846320179",
                "1044727370445234196",
                "1044727553618882581",
                "992093067530219550",
                "956065520656986172",
                "1044730151281369150"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2608013421,
    "creationDate": 1667853785,
    "type": "guild",
    "title": "Automod Non-Community Guilds Release",
    "description": [
      "Control",
      "Treatment 1: Automod Non-Community Guilds Release"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-12_mention_raid_limit",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 3,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Automod Mention Raid Limit",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "PARTNERED"
              ]
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "Treatment 1: Automod Mention Raid Limit",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "COMMUNITY"
              ]
            }
          ]
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: Automod Mention Raid Limit",
          "bucket": 1,
          "ids": [
            "1034492236483792958",
            "982376986070626344",
            "1022242080233357352",
            "1052692953279246487",
            "763838479293349899",
            "1044721355821678662",
            "1052695012732850206",
            "816784679717044276",
            "1053018122531127448",
            "1054503586761035906",
            "876918412369088582",
            "1054511748557840404",
            "1054512414709788842",
            "1054515966035365960",
            "1054565950759899176",
            "1039940765750665226"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 1318029053,
    "creationDate": 1670445785,
    "type": "guild",
    "title": "Automod Mention Raid Limit",
    "description": [
      "Control",
      "Treatment 1: Automod Mention Raid Limit"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-01_mention_raid_notice",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 1,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Automod Mention Raid Notice",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "PARTNERED"
              ]
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "Treatment 1: Automod Mention Raid Notice",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "COMMUNITY"
              ]
            }
          ]
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: Automod Mention Raid Notice",
          "bucket": 1,
          "ids": [
            "816784679717044276",
            "876918412369088582",
            "1039940765750665226"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 805661295,
    "creationDate": 1673124185,
    "type": "guild",
    "title": "Automod Mention Raid Notice",
    "description": [
      "Control",
      "Treatment 1: Automod Mention Raid Notice"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-02_automod_custom_message",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Automod Custom Message",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "PARTNERED"
              ]
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "Treatment 1: Automod Custom Message",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: Automod Custom Message",
          "bucket": 1,
          "ids": [
            "816784679717044276",
            "876918412369088582",
            "393088095840370689",
            "424012709219008522",
            "1029315212005888060",
            "453709566409179137",
            "224565836277481473",
            "193120847844737025",
            "120330239996854274",
            "187450744427773963",
            "801178173945151490",
            "125440014904590336",
            "140933721929940992",
            "942646368453935204",
            "222078108977594368",
            "451446182515048448",
            "364119753972776960"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 511273769,
    "creationDate": 1675802585,
    "type": "guild",
    "title": "Automod Custom Message",
    "description": [
      "Control",
      "Treatment 1: Automod Custom Message"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-02_free_form",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: Automod Server Policy",
          "bucket": 1,
          "ids": [
            "876918412369088582",
            "860609921602682910",
            "942897714956472401",
            "771800742977077289",
            "434445105982865408",
            "169256939211980800",
            "613425648685547541",
            "1088225778442960917",
            "662341325353385985",
            "994171988425850901",
            "943680870966001664",
            "1009937213603188777",
            "896730415317016596"
          ]
        },
        {
          "treatment": "Treatment 10: Automod Server Policy Rules Summarization",
          "bucket": 10,
          "ids": [
            "816784679717044276"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 2001176293,
    "creationDate": 1675802585,
    "type": "guild",
    "title": "Automod Server Policy",
    "description": [
      "Control",
      "Treatment 1: Automod Server Policy",
      "Treatment 10: Automod Server Policy Rules Summarization"
    ],
    "buckets": [
      0,
      1,
      10
    ]
  },
  {
    "id": "2023-05_automod_user_profile_ab",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 1,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "id",
              "ids": [
                "322850917248663552",
                "662267976984297473",
                "586704051148816385",
                "517660115675906051",
                "926691694680870982",
                "1046979304547954728",
                "710745950380884009",
                "679875946597056683",
                "989166677390426132",
                "974519864045756446"
              ]
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "AUTOMOD_TRIGGER_USER_PROFILE"
              ]
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 6000,
                  "end": 10000
                }
              ]
            },
            {
              "treatment": "Treatment 1: Automod on User Profile enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 3000,
                  "end": 6000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "COMMUNITY"
              ]
            }
          ]
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: Automod on User Profile enabled",
          "bucket": 1,
          "ids": [
            "651595875897835540"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 4261225962,
    "creationDate": 1683492185,
    "type": "guild",
    "title": "Automod on User Profile A/B",
    "description": [
      "Control",
      "Treatment 1: Automod on User Profile enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-07_system_dm_safety_onboarding",
    "defaultConfig": {
      "systemDMRedesignEnabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled, v1 copy",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-07_system_dm_safety_onboarding"
              ]
            }
          ]
        }
      ]
    },
    "hash": 488500683,
    "creationDate": 1657226585,
    "type": "user",
    "title": "System DM Safety Onboarding",
    "description": [
      "Control",
      "Treatment 1: Enabled, v1 copy",
      "Treatment 2: Enabled, v2 copy"
    ],
    "buckets": [
      0,
      1,
      2
    ]
  },
  {
    "id": "2023-01_forums_non_community",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 5000,
                  "end": 10000
                }
              ]
            },
            {
              "treatment": "Treatment 1: On",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 2500,
                  "end": 5000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: On",
          "bucket": 1,
          "ids": [
            "651595875897835540",
            "1046918739599315124",
            "971683003606654976",
            "1070109297268248639"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 1446479414,
    "creationDate": 1673124185,
    "type": "guild",
    "title": "Forum non-community",
    "description": [
      "Control",
      "Treatment 1: On"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-05_go_live_quest_fortnite",
    "defaultConfig": {
      "dropsEnabled": false,
      "streamLengthRequirement": 0,
      "viewerCountRequirement": 0,
      "autoEnrollment": false,
      "showUnenroll": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: 15 min stream req + auto enrollment",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-05_go_live_quest_fortnite"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2709361021,
    "creationDate": 1683492185,
    "type": "user",
    "title": "Fortnite: Go Live Quest",
    "description": [
      "Control",
      "Treatment 1: 15 min stream req + auto enrollment",
      "Treatment 99: 2 minute stream req + auto enrollment"
    ],
    "buckets": [
      0,
      1,
      99
    ]
  },
  {
    "id": "2023-03_onboarding_upsell_lifecycle",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 3,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        },
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 2000,
                  "end": 4400
                },
                {
                  "start": 6400,
                  "end": 10000
                }
              ]
            },
            {
              "treatment": "Treatment 1: Show new lifecycle upsells",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 400
                },
                {
                  "start": 400,
                  "end": 2000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "member_count",
              "range": {
                "start": 5000,
                "end": 10000
              }
            },
            {
              "type": "range_by_hash",
              "range": 10000
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "member_count",
              "range": {
                "start": 5000,
                "end": 10000
              }
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Show new lifecycle upsells",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "member_count",
              "range": {
                "start": 5000,
                "end": 10000
              }
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "Treatment 1: Show new lifecycle upsells",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "id",
              "ids": [
                "1096119963267375124",
                "1096120009211781182"
              ]
            }
          ]
        }
      ]
    },
    "hash": 485475819,
    "creationDate": 1678221785,
    "type": "guild",
    "title": "Onboarding Upsell Lifecycle",
    "description": [
      "Control",
      "Treatment 1: Show new lifecycle upsells"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-03_pomelo",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-03_pomelo"
              ]
            }
          ]
        }
      ]
    },
    "hash": 268309827,
    "creationDate": 1678221785,
    "type": "user",
    "title": "Pomelo",
    "description": [
      "Control",
      "Treatment 1: enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-05_safety_user_sentiment",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Eligible",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-05_safety_user_sentiment"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1344378364,
    "creationDate": 1683492185,
    "type": "user",
    "title": "Safety User Sentiment Feedback Eligible",
    "description": [
      "Control",
      "Treatment 1: Eligible"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-12_home_header_redesign",
    "defaultConfig": {
      "hasNewHeader": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: New Header",
          "bucket": 1,
          "ids": [
            "814669604840013874",
            "132251458665054209",
            "942897714956472401",
            "786557653924708373",
            "524552788932558848",
            "432763481289261077",
            "674657048209784872",
            "142082511902605313",
            "244230771232079873",
            "697834746734051358",
            "264363165855252480",
            "489514135608885250",
            "782831067534327828",
            "238080556708003851",
            "808241932919767050",
            "817576132726620200",
            "522477306787397642",
            "256926147827335170",
            "567099257367035926",
            "884458417467559936",
            "453709566409179137",
            "642150179952132107",
            "498851748690264082",
            "393088095840370689",
            "187450744427773963"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 3405402067,
    "creationDate": 1670445785,
    "type": "guild",
    "title": "Home New Header",
    "description": [
      "Control",
      "Treatment 1: New Header"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-03_channel_name_emojis",
    "defaultConfig": {
      "enabled": false,
      "left": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable channel name emojis",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-03_channel_name_emojis"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3524854832,
    "creationDate": 1678221785,
    "type": "user",
    "title": "Channel Emojis",
    "description": [
      "Control",
      "Treatment 1: Enable channel name emojis",
      "Treatment 2: Emojis to left of channel icon"
    ],
    "buckets": [
      0,
      1,
      2
    ]
  },
  {
    "id": "2023-02_voice_channel_statuses",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: Enable viewing and setting voice channel statuses for guild",
          "bucket": 1,
          "ids": [
            "890883112500854804",
            "887867262839705651"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 2809294122,
    "creationDate": 1675802585,
    "type": "guild",
    "title": "Voice Channel Status Guild Experiment",
    "description": [
      "Control",
      "Treatment 1: Enable viewing and setting voice channel statuses for guild",
      "Treatment 2: A/A test, identical to treatment 1"
    ],
    "buckets": [
      0,
      1,
      2
    ]
  },
  {
    "id": "2023-05_fast_onboarding_landing",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: 2x Speed",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-05_fast_onboarding_landing"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1461620747,
    "creationDate": 1683492185,
    "type": "user",
    "title": "Fast Onboarding Landing",
    "description": [
      "Control",
      "Treatment 1: 2x Speed",
      "Treatment 2: Instant",
      "Treatment 42: Instant Untracked"
    ],
    "buckets": [
      0,
      1,
      2,
      42
    ]
  },
  {
    "id": "2023-02_onboardingdropdowns",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 1: On",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "range_by_hash",
              "range": 10000
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: On",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "id",
              "ids": [
                "874345844743213126",
                "962007075288915998"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3884904940,
    "creationDate": 1675802585,
    "type": "guild",
    "title": "Enables dropdown selections from onboarding prompts",
    "description": [
      "Control",
      "Treatment 1: On"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-01_guild_onboarding_includes_rules",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Last page of onboarding is rules",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-01_guild_onboarding_includes_rules"
              ]
            }
          ]
        }
      ]
    },
    "hash": 987713133,
    "creationDate": 1673124185,
    "type": "user",
    "title": "Guild Onboarding includes rules experience",
    "description": [
      "Control",
      "Treatment 1: Last page of onboarding is rules"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-03_activities_game_night_coach_mark",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable Activities Game Night",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-03_activities_game_night_coach_mark"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2171590360,
    "creationDate": 1678221785,
    "type": "user",
    "title": "Activities Game Night Experiment",
    "description": [
      "Control",
      "Treatment 1: Enable Activities Game Night"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-03_activity_gartic_phone_coach_mark",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable Activity Coach Mark Gartic Phone",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-03_activity_gartic_phone_coach_mark"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1886305766,
    "creationDate": 1678221785,
    "type": "user",
    "title": "Activity Coach Mark Gartic Phone",
    "description": [
      "Control",
      "Treatment 1: Enable Activity Coach Mark Gartic Phone"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-11_activitiesbashoutcoachmark",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable Bash Out Coach Mark",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-11_activitiesbashoutcoachmark"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1696233097,
    "creationDate": 1667853785,
    "type": "user",
    "title": "Bash Out Coach Mark",
    "description": [
      "Control",
      "Treatment 0: Control",
      "Treatment 1: Enable Bash Out Coach Mark"
    ],
    "buckets": [
      0,
      0,
      1
    ]
  },
  {
    "id": "2021-10_study_group",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 1,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 6666,
                  "end": 9999
                },
                {
                  "start": 9999,
                  "end": 10000
                }
              ]
            },
            {
              "treatment": "Treatment 1: Enables study group sidebar",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 3333,
                  "end": 6666
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: Enables study group sidebar",
          "bucket": 1,
          "ids": [
            "882680660588904448",
            "882703776794959873",
            "859533785225494528",
            "859533828754505741"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 4030301365,
    "creationDate": 1633639385,
    "type": "guild",
    "title": "Student hub study group",
    "description": [
      "Control",
      "Treatment 1: Enables study group sidebar"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2021-12_discovery_requirements_m2",
    "defaultConfig": {
      "enableLowerMemberCountReq": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Allow a server to become discoverable with lower member count requirements",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2021-12_discovery_requirements_m2"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1065075299,
    "creationDate": 1638909785,
    "type": "guild",
    "title": "Lower Server Discovery member count requirements",
    "description": [
      "Control",
      "Treatment 1: Allow a server to become discoverable with lower member count requirements"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-11_default_disable_mass_mention",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "COMMUNITY"
              ]
            },
            {
              "type": "member_count",
              "range": {
                "start": 5000,
                "end": 10000
              }
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: Enabled",
          "bucket": 1,
          "ids": [
            "651595875897835540",
            "435572461912719360",
            "1042197875423203391",
            "1042198489783865384",
            "1042199171073060864",
            "1042202474200698990",
            "1044297931039199233",
            "999116324842246224",
            "987012965834297405"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 2462216785,
    "creationDate": 1667853785,
    "type": "guild",
    "title": "Disable mass mentions for communities by default",
    "description": [
      "Control",
      "Treatment 1: Enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2021-11_hub_events",
    "defaultConfig": {
      "showHubEventsList": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 3333
                },
                {
                  "start": 3333,
                  "end": 6666
                },
                {
                  "start": 6666,
                  "end": 9999
                },
                {
                  "start": 9999,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "hub_type"
            }
          ]
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: Show Hub Events List",
          "bucket": 1,
          "ids": [
            "882680660588904448"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 1107510295,
    "creationDate": 1636317785,
    "type": "guild",
    "title": "Hub Events",
    "description": [
      "Control",
      "Treatment 1: Show Hub Events List"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-12_channel_notice_redesign",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Show Redesigned Channel Notices",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-12_channel_notice_redesign"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3502788249,
    "creationDate": 1670445785,
    "type": "user",
    "title": "Channel Notice Redesign",
    "description": [
      "Control",
      "Treatment 1: Show Redesigned Channel Notices",
      "Treatment 2: Show Redesigned Stage/Event Notices",
      "Treatment 3: Show Redesigned Channel Notices & Stage/Event Notices"
    ],
    "buckets": [
      0,
      1,
      2,
      3
    ]
  },
  {
    "id": "2022-01_server_recommendations_rollout",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Show server recommendations",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-01_server_recommendations_rollout"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2353632184,
    "creationDate": 1641588185,
    "type": "user",
    "title": "Rollout experiment for server recommendations.",
    "description": [
      "Control",
      "Treatment 1: Show server recommendations"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-01_clear_all_message_requests",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-01_clear_all_message_requests"
              ]
            }
          ]
        }
      ]
    },
    "hash": 400679165,
    "creationDate": 1673124185,
    "type": "user",
    "title": "Safety Experience Reject All Message Requests",
    "description": [
      "Control",
      "Treatment 1: Enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-02_parent_tools_launch",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-02_parent_tools_launch"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1869634267,
    "creationDate": 1675802585,
    "type": "user",
    "title": "Safety - Family Center Launch",
    "description": [
      "Control",
      "Treatment 1: Enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2021-04_longer_group_dm_invites",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Makes group DM invites expire after 1 week.",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2021-04_longer_group_dm_invites"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1693164202,
    "creationDate": 1617828185,
    "type": "user",
    "title": "Longer Group DM Invites",
    "description": [
      "Control",
      "Treatment 1: Makes group DM invites expire after 1 week."
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-05_clear_pending_incoming_friend_requests",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-05_clear_pending_incoming_friend_requests"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3060384904,
    "creationDate": 1683492185,
    "type": "user",
    "title": "Enable ability to clear incoming friend requests",
    "description": [
      "Control",
      "Treatment 1: Enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-01_shared_canvas",
    "defaultConfig": {
      "isSharedCanvasEnabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "INTERNAL_EMPLOYEE_ONLY"
              ]
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable Shared Canvas",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "SHARED_CANVAS_FRIENDS_AND_FAMILY_TEST"
              ]
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: Enable Shared Canvas",
          "bucket": 1,
          "ids": [
            "1078807279979221032",
            "942879381230063656",
            "172056827335409665",
            "993957185493160057",
            "334452829731422209",
            "225077695141117955",
            "678742032415588412",
            "460657173417164800",
            "976581767068786728",
            "426609467535392778",
            "133838756447911936",
            "175987125626339328",
            "537070934553526272",
            "862059423949127741",
            "710677407257854033",
            "132751006349000704",
            "822219052402606132",
            "1021074787025555567",
            "900242963358179368",
            "315263844207558671",
            "862757171887603722",
            "222852163368386560",
            "696480667348893696",
            "409190184744255490",
            "764656846777745429"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 280866660,
    "creationDate": 1673124185,
    "type": "guild",
    "title": "Shared Canvas",
    "description": [
      "Control",
      "Treatment 1: Enable Shared Canvas"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-12_activities_auto_suggest",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable VC Activities Mini Shelf",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-12_activities_auto_suggest"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2732395257,
    "creationDate": 1670445785,
    "type": "user",
    "title": "Activities Auto Suggest",
    "description": [
      "Control",
      "Treatment 1: Enable VC Activities Mini Shelf"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-03_activitieswatchtogetherpromo",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: enable Watch Together promo",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-03_activitieswatchtogetherpromo"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3238880497,
    "creationDate": 1678221785,
    "type": "user",
    "title": "Activities Watch Together Promo",
    "description": [
      "Control",
      "Treatment 1: enable Watch Together promo"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-03_activities_watch_together_promo_sparkles_week_1",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: enable Watch Together promo week 1 sparkles",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-03_activities_watch_together_promo_sparkles_week_1"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1312040082,
    "creationDate": 1678221785,
    "type": "user",
    "title": "Activities Watch Together Promo Week 1 Sparkles",
    "description": [
      "Control",
      "Treatment 1: enable Watch Together promo week 1 sparkles"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-03_activities_watch_together_promo_sparkles_week_2",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: enable Watch Together promo week 2 sparkles",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-03_activities_watch_together_promo_sparkles_week_2"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1736363471,
    "creationDate": 1678221785,
    "type": "user",
    "title": "Activities Watch Together Promo Week 2 Sparkles",
    "description": [
      "Control",
      "Treatment 1: enable Watch Together promo week 2 sparkles"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-03_pax_vc_tile_activities",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable PAX VC Tile Activities",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-03_pax_vc_tile_activities"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3149823763,
    "creationDate": 1678221785,
    "type": "user",
    "title": "PAX VC Tile Activities",
    "description": [
      "Control",
      "Treatment 1: Enable PAX VC Tile Activities"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-01_vc_tile_activities_entry_point",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable one or two users VC Tile Activities Entry Point",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-01_vc_tile_activities_entry_point"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1289034223,
    "creationDate": 1673124185,
    "type": "user",
    "title": "VC Tile Activities Entry Point",
    "description": [
      "Control",
      "Treatment 1: Enable one or two users VC Tile Activities Entry Point",
      "Treatment 2: Enable any number of users VC Tile Activities Entry Point"
    ],
    "buckets": [
      0,
      1,
      2
    ]
  },
  {
    "id": "2022-10_profile_panel",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: View Profiles In DMs With Theme Colors",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-10_profile_panel"
              ]
            }
          ]
        }
      ]
    },
    "hash": 71699970,
    "creationDate": 1665175385,
    "type": "user",
    "title": "Profiles In DMs",
    "description": [
      "Control",
      "Treatment 1: View Profiles In DMs With Theme Colors",
      "Treatment 2: View Profiles In DMs Without Theme Colors"
    ],
    "buckets": [
      0,
      1,
      2
    ]
  },
  {
    "id": "2021-06_guild_subscriptions_payment_flow_test_page",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Test page for guild subscription payment flows",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2021-06_guild_subscriptions_payment_flow_test_page"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1573645622,
    "creationDate": 1623098585,
    "type": "user",
    "title": "Test page for guild subscription payment flows",
    "description": [
      "Control",
      "Treatment 1: Test page for guild subscription payment flows"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-11_premium_bogo_month_promotion",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled without promo materials (basic + classic)",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-11_premium_bogo_month_promotion"
              ]
            }
          ]
        }
      ]
    },
    "hash": 28781292,
    "creationDate": 1667853785,
    "type": "user",
    "title": "Nitro Promo for Black Friday",
    "description": [
      "Control",
      "Treatment 1: Enabled without promo materials (basic + classic)",
      "Treatment 2: Enabled with promo materials (Rest of world)"
    ],
    "buckets": [
      0,
      1,
      2
    ]
  },
  {
    "id": "2023-04_free_user_marketing_page_cta_copy",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Users will see \"Buy Now\" on all (tier 0 & tier 2) marketing page CTAs",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-04_free_user_marketing_page_cta_copy"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1038983733,
    "creationDate": 1680900185,
    "type": "user",
    "title": "Free User Marketing Page CTA Copy ",
    "description": [
      "Control",
      "Treatment 1: Users will see \"Buy Now\" on all (tier 0 & tier 2) marketing page CTAs"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-05_premium_marketing_page_trial_tier_card",
    "defaultConfig": {
      "pillLocation": 0
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Free trial pill on top of the card",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-05_premium_marketing_page_trial_tier_card"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2553858368,
    "creationDate": 1683492185,
    "type": "user",
    "title": "Premium marketing page trial tier card",
    "description": [
      "Control",
      "Treatment 1: Free trial pill on top of the card",
      "Treatment 2: Free trial pill inline with the card"
    ],
    "buckets": [
      0,
      1,
      2
    ]
  },
  {
    "id": "2023-04_tier_0_trial_cta_copy",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Users with a tier 0 trial offer will see \"Get Free Trial\"",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-04_tier_0_trial_cta_copy"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3084409284,
    "creationDate": 1680900185,
    "type": "user",
    "title": "Tier 0 Trial CTA Copy",
    "description": [
      "Control",
      "Treatment 1: Users with a tier 0 trial offer will see \"Get Free Trial\"",
      "Treatment 2: Users with a tier 0 trial offer will see \"Try 1 Month Free\"",
      "Treatment 3: Users with a tier 0 trial offer will see \"Start Free Trial\""
    ],
    "buckets": [
      0,
      1,
      2,
      3
    ]
  },
  {
    "id": "2023-02_nitro_most_popular_tag",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: show most popular tag on nitro plan",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-02_nitro_most_popular_tag"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2459440542,
    "creationDate": 1675802585,
    "type": "user",
    "title": "Most popular tag in nitro plan selection",
    "description": [
      "Control",
      "Treatment 1: show most popular tag on nitro plan"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-06_remove_spotify_dc_nagbar",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Remove Nagbar",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-06_remove_spotify_dc_nagbar"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1682576930,
    "creationDate": 1686170585,
    "type": "user",
    "title": "Remove Spotify DC Nagbar",
    "description": [
      "Control",
      "Treatment 1: Remove Nagbar"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2021-06_preview_promotions",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Preview Enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2021-06_preview_promotions"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3704699110,
    "creationDate": 1623098585,
    "type": "user",
    "title": "Promotions Preview",
    "description": [
      "Control",
      "Treatment 1: Preview Enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-04_birthday_activities_whats_new_gdm_tile",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable GDM tile",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-04_birthday_activities_whats_new_gdm_tile"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3839121633,
    "creationDate": 1680900185,
    "type": "user",
    "title": "Birthday Activities Whats New GDM Tile",
    "description": [
      "Control",
      "Treatment 1: Enable GDM tile"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-04_birthday_activities_jamspace_tile",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable Jamspace tile",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-04_birthday_activities_jamspace_tile"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3742269191,
    "creationDate": 1680900185,
    "type": "user",
    "title": "Birthday Activities Whats New Jamspace Tile",
    "description": [
      "Control",
      "Treatment 1: Enable Jamspace tile"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-05_birthday_activities_poker",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable Poker tile",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-05_birthday_activities_poker"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3212616249,
    "creationDate": 1683492185,
    "type": "user",
    "title": "Birthday Activities Poker Tile",
    "description": [
      "Control",
      "Treatment 1: Enable Poker tile"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-04_birthday_activities_putt_party_tile",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable Putt Party tile",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-04_birthday_activities_putt_party_tile"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2616904300,
    "creationDate": 1680900185,
    "type": "user",
    "title": "Birthday Activities Whats New Putt Party Tile",
    "description": [
      "Control",
      "Treatment 1: Enable Putt Party tile"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2021-11_discovery_tags",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Show keyword tags on home and search result pages",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2021-11_discovery_tags"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1025804489,
    "creationDate": 1636317785,
    "type": "user",
    "title": "Discovery Tags",
    "description": [
      "Control",
      "Treatment 1: Show keyword tags on home and search result pages",
      "Treatment 2: Show keyword tags on home and search result pages and under the search bar"
    ],
    "buckets": [
      0,
      1,
      2
    ]
  },
  {
    "id": "2022-01_discovery_iar",
    "defaultConfig": {
      "canSeeInAppReportingButtons": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Show IAR buttons in Server Discovery",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-01_discovery_iar"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1877212037,
    "creationDate": 1641588185,
    "type": "user",
    "title": "Ability to report servers in Server Discovery",
    "description": [
      "Control",
      "Treatment 1: Show IAR buttons in Server Discovery"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-01_consumer_education_launch",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Mute",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-01_consumer_education_launch"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1318110575,
    "creationDate": 1673124185,
    "type": "user",
    "title": "Safety Consumer Education Launch - Block/Mute",
    "description": [
      "Control",
      "Treatment 1: Mute",
      "Treatment 2: Block"
    ],
    "buckets": [
      0,
      1,
      2
    ]
  },
  {
    "id": "2023-04_dm_spam_filter_coachmark",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-04_dm_spam_filter_coachmark"
              ]
            }
          ]
        }
      ]
    },
    "hash": 64742860,
    "creationDate": 1680900185,
    "type": "user",
    "title": "Safety DM Spam Filter Coachmark rollout",
    "description": [
      "Control",
      "Treatment 1: Enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-04_account_profile_popout",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable Account Profile Popout",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-04_account_profile_popout"
              ]
            }
          ]
        }
      ]
    },
    "hash": 4156073260,
    "creationDate": 1649364185,
    "type": "user",
    "title": "Account Profile Popout",
    "description": [
      "Control",
      "Treatment 1: Enable Account Profile Popout",
      "Treatment 2: Enable Account Profile Popout w/ DiscordTag button"
    ],
    "buckets": [
      0,
      1,
      2
    ]
  },
  {
    "id": "2023-03_mute_block_aa",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Mute",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-03_mute_block_aa"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3135454939,
    "creationDate": 1678221785,
    "type": "user",
    "title": "Safety Consumer Education Block/Mute - A/A",
    "description": [
      "Control",
      "Treatment 1: Mute",
      "Treatment 2: Block"
    ],
    "buckets": [
      0,
      1,
      2
    ]
  },
  {
    "id": "2023-04_consumer_education_launch__reporting",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Reporting",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-04_consumer_education_launch__reporting"
              ]
            }
          ]
        }
      ]
    },
    "hash": 3966944317,
    "creationDate": 1680900185,
    "type": "user",
    "title": "Consumer Education Launch - Reporting",
    "description": [
      "Control",
      "Treatment 1: Reporting"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2021-09_watch_together_rollout",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": []
    },
    "hash": 3607703918,
    "creationDate": 1631047385,
    "type": "guild",
    "title": "Exposure tracking for Watch Together (do not override)",
    "description": [
      "Control"
    ],
    "buckets": [
      0
    ]
  },
  {
    "id": "2022-02_guild_audit_log_user",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Show Guild Audit Log 2.0 for user",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-02_guild_audit_log_user"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2802647294,
    "creationDate": 1644266585,
    "type": "user",
    "title": "Guild Audit Log - User Feature Flag",
    "description": [
      "Control",
      "Treatment 1: Show Guild Audit Log 2.0 for user"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-02_guild_audit_log_guild",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: Show Guild Audit Log 2.0 for guild",
          "bucket": 1,
          "ids": [
            "799349358776549378",
            "763838479293349899"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 1412337990,
    "creationDate": 1644266585,
    "type": "guild",
    "title": "Guild Audit Log - Guild Feature Flag",
    "description": [
      "Control",
      "Treatment 1: Show Guild Audit Log 2.0 for guild"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-05_safety_coms_update",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-05_safety_coms_update"
              ]
            }
          ]
        }
      ]
    },
    "hash": 542042630,
    "creationDate": 1651956185,
    "type": "user",
    "title": "Safety Integrity Platform Coms Update",
    "description": [
      "Control",
      "Treatment 1: Enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-04_server_products",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enables Server Products (AKA one time purchases for creator guilds)",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-04_server_products"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2236798974,
    "creationDate": 1680900185,
    "type": "guild",
    "title": "Server Products",
    "description": [
      "Control",
      "Treatment 1: Enables Server Products (AKA one time purchases for creator guilds)"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-03_guild_access_rate_insight_experiment",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Show guild access rate in insights",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-03_guild_access_rate_insight_experiment"
              ]
            }
          ]
        }
      ]
    },
    "hash": 1899119674,
    "creationDate": 1646685785,
    "type": "guild",
    "title": "Guild Access Rate Insight Experiment",
    "description": [
      "Control",
      "Treatment 1: Show guild access rate in insights"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2020-12_guild_delete_feedback",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Show guild delete feedback",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2020-12_guild_delete_feedback"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2003494159,
    "creationDate": 1607373785,
    "type": "user",
    "title": "Guild Delete Feedback experiment",
    "description": [
      "Control",
      "Treatment 1: Show guild delete feedback"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-02_onboarding_advanced_mode",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 1: On",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "COMMUNITY_CANARY"
              ]
            },
            {
              "type": "range_by_hash",
              "range": 10000
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "COMMUNITY_CANARY"
              ]
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "Treatment 1: On",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "range_by_hash",
              "range": 10000
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: On",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "id",
              "ids": [
                "161053416796323840",
                "548440972997033996"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2544556038,
    "creationDate": 1675802585,
    "type": "guild",
    "title": "Enables setting up onboarding with advanced mode",
    "description": [
      "Control",
      "Treatment 1: On"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-01_voice_messages",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Can send voice messages",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: Can send voice messages",
          "bucket": 1,
          "ids": [
            "997637077099364383",
            "743213213142876203",
            "943265993613008967",
            "809943708283830302",
            "281683040739262465",
            "1083177865400553502",
            "877393448309772319",
            "855181690824425512",
            "814196235741167637",
            "409190184744255490",
            "1096494224343584858",
            "1070131921218174976",
            "308304292006330369"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 968663312,
    "creationDate": 1673124185,
    "type": "guild",
    "title": "Voice Messages",
    "description": [
      "Control",
      "Treatment 1: Can send voice messages"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-03_voice_messages_dm",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Can send voice messages",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-03_voice_messages_dm"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2937329910,
    "creationDate": 1678221785,
    "type": "user",
    "title": "Voice Messages in DMs",
    "description": [
      "Control",
      "Treatment 1: Can send voice messages"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-05_clyde_ai_guild_personality",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: enable personality setting",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-05_clyde_ai_guild_personality"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2701598838,
    "creationDate": 1683492185,
    "type": "guild",
    "title": "Modify Clyde's Personality",
    "description": [
      "Control",
      "Treatment 1: enable personality setting"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-06_community_admin_server",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Show button if requirements met",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "feature",
              "features": [
                "COMMUNITY"
              ]
            },
            {
              "type": "member_count",
              "range": {
                "start": 500,
                "end": 10000
              }
            }
          ]
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 2: Bypass requirements",
          "bucket": 2,
          "ids": [
            "132251458665054209"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 3282315774,
    "creationDate": 1654634585,
    "type": "guild",
    "title": "Show the button to join the admin server in community overview server settings page",
    "description": [
      "Control",
      "Treatment 1: Show button if requirements met",
      "Treatment 2: Bypass requirements"
    ],
    "buckets": [
      0,
      1,
      2
    ]
  },
  {
    "id": "2023-03_onboarding_soft_requirement_for_partnership",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Show onboarding soft requirement for partnership",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "range_by_hash",
              "range": 10000
            }
          ]
        },
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": []
    },
    "hash": 3738976194,
    "creationDate": 1678221785,
    "type": "guild",
    "title": "Hide onboarding soft requirement for partnership",
    "description": [
      "Control",
      "Treatment 1: Show onboarding soft requirement for partnership"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2021-10_pause_partner_applications_experiment",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: On no override",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2021-10_pause_partner_applications_experiment"
              ]
            }
          ]
        }
      ]
    },
    "hash": 4049227286,
    "creationDate": 1633639385,
    "type": "user",
    "title": "Pause Partner Applications Experiment",
    "description": [
      "Control",
      "Treatment 0: Off",
      "Treatment 1: On no override"
    ],
    "buckets": [
      0,
      0,
      1
    ]
  },
  {
    "id": "2022-06_free_sticker_slots_design_updates",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [
        {
          "treatment": "Treatment 1: Enabled",
          "bucket": 1,
          "ids": [
            "651595875897835540"
          ]
        }
      ],
      "overrides_formatted": []
    },
    "hash": 258580919,
    "creationDate": 1654634585,
    "type": "guild",
    "title": "Free Sticker Slots Design Updates",
    "description": [
      "Control",
      "Treatment 1: Enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2023-04_pomelo_announcement",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: enabled",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2023-04_pomelo_announcement"
              ]
            }
          ]
        }
      ]
    },
    "hash": 2804111708,
    "creationDate": 1680900185,
    "type": "user",
    "title": "Pomelo Announcement",
    "description": [
      "Control",
      "Treatment 1: enabled"
    ],
    "buckets": [
      0,
      1
    ]
  },
  {
    "id": "2022-12_localized_pricing_promo_manager",
    "defaultConfig": {
      "enabled": false
    },
    "rollout": {
      "revision": 0,
      "populations": [
        {
          "position": [
            {
              "treatment": "None",
              "bucket": -1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 10000
                }
              ]
            }
          ],
          "filters": []
        }
      ],
      "overrides": [],
      "overrides_formatted": [
        {
          "position": [
            {
              "treatment": "Treatment 1: Enable Localized Pricing Promo Manager",
              "bucket": 1,
              "rollouts": [
                {
                  "start": 0,
                  "end": 500
                }
              ]
            }
          ],
          "filters": [
            {
              "type": "build_override",
              "experiments": [
                "2022-12_localized_pricing_promo_manager"
              ]
            }
          ]
        }
      ]
    },
    "hash": 4215507151,
    "creationDate": 1670445785,
    "type": "user",
    "title": "Localized Pricing Promo Manager",
    "description": [
      "Control",
      "Treatment 1: Enable Localized Pricing Promo Manager"
    ],
    "buckets": [
      0,
      1
    ]
  }
];

const userExperimentAverages: UserExperiment[][] = [];

for (let i = 0; i < config.EXPERIMENT_ROLLOUT_RANGE; i++) {
  (async () => {
    /*
    const rolloutRegistry: RolloutRegistrar[] = await axios.get(
      config.EXPERIMENT_REGISTRY_URL
    );
    */

    const response: UserExperimentRolloutResponse = await axios.get(
      config.EXPERIMENT_ROLLOUT_URL
    );
    const rolloutList: UserExperimentRolloutList = response.data;

    const userExperiments: UserExperiment[] = rolloutList.assignments.map(
      (assignment: number[]) => {
        return {
          id: rolloutRegistry.find((exp) => exp.hash === assignment[0])?.id,
          hash: assignment[0],
          revision: assignment[1],
          bucket: assignment[2],
          override: assignment[3],
          population: assignment[4],
          hash_result: assignment[5],
        } as UserExperiment;
      }
    );

    userExperimentAverages.push(userExperiments);
  })();
}

const uniqueExperimentIdentifiers: string[] = [
  ...new Set(
    userExperimentAverages
      .flat()
      .map((experiment: UserExperiment) => experiment.id as string)
      .filter((result: string) => result)
  ),
];

uniqueExperimentIdentifiers.forEach(async (experimentIdentifier: string) => {
  /*
  const rolloutRegistry: RolloutRegistrar[] = await axios.get(
    config.EXPERIMENT_REGISTRY_URL
  );
  */

  const selectedAverages: UserExperiment[] = userExperimentAverages
    .flat()
    .filter(
      (experiment: UserExperiment) => experiment.id === experimentIdentifier
    );

  const experimentRollout: RolloutRegistrar = rolloutRegistry.find(
    (rollout: RolloutRegistrar) => rollout.id === experimentIdentifier
  ) as RolloutRegistrar;

  experimentRollout.buckets.forEach((bucket: number) => {
    const eligibilityAverage: UserExperiment[] = selectedAverages.filter(
      (experiment: UserExperiment) => experiment.bucket === bucket
    );

    const eligibilityPercentage: number =
      (eligibilityAverage.length / config.EXPERIMENT_ROLLOUT_RANGE) * 100;

    console.log(
      `experiment ${experimentIdentifier} - rollout percentage for bucket ${bucket} (${experimentRollout.description[bucket]}): ${eligibilityPercentage}%`
    );
  });

  console.log();
});
